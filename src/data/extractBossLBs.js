var fs = require('fs')

function convertToCSV(objArray) {
  var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  var str = 'Placement,Name,Score\r\n';

  for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
          if (line != '') line += ','

          line += array[i][index];
      }

      str += line + '\r\n';
  }

  return str;
}

async function main() {
  const bosses = await fetch("https://data.ninjakiwi.com/btd6/bosses/")
  const bossesJson = await bosses.json()

  if (!bossesJson.success) {
    console.log(bossesJson.reason)
    return
  }
  
  for (const x of [bossesJson.body[0]]) {
    const id = x.id
    const name = x.name
    let lbNormal = []
    let lbElite = []
    let placementNormal = 1
    let placementElite = 1

    for (let i = 1; i <= 40; i++) {
      do {
        var pageNormal = await fetch(`https://data.ninjakiwi.com/btd6/bosses/${id}/leaderboard/standard/1?page=${i}`)
        var pageJsonNormal = await pageNormal.json()
        await new Promise(r => setTimeout(r, 1000));
      } while (!pageJsonNormal.success)

      do {
        var pageElite = await fetch(`https://data.ninjakiwi.com/btd6/bosses/${id}/leaderboard/elite/1?page=${i}`)
        var pageJsonElite = await pageElite.json()
        await new Promise(r => setTimeout(r, 1000));
      }
      while (!pageJsonElite.success)

      console.log(`${i} page success`)
      pageJsonNormal.body.map(({
        displayName,
        score,
        scoreParts,
      }) => {
        if (scoreParts[0] && ["Tiers", "Cash Spent"].includes(scoreParts[0].name)) {
          var displayedScore = score
          var secondaryScore = `${Math.floor(scoreParts[1].score / 60000)}:${scoreParts[1].score % 60000 / 1000 < 10 ? '0' : ''}${scoreParts[1].score % 60000 / 1000}`
        } else {
          var displayedScore = `${Math.floor(score / 60000)}:${score % 60000 / 1000 < 10 ? '0' : ''}${score % 60000 / 1000}`
        }
        lbNormal.push({
          placementNormal,
          displayName,
          score: displayedScore,
          secondaryScore
        })
        placementNormal++
      })

      pageJsonElite.body.map(({
        displayName,
        score,
        scoreParts,
      }) => {
        if (scoreParts[0] && ["Tiers", "Cash Spent"].includes(scoreParts[0].name)) {
          var displayedScore = score
          var secondaryScore = `${Math.floor(scoreParts[1].score / 60000)}:${scoreParts[1].score % 60000 / 1000 < 10 ? '0' : ''}${scoreParts[1].score % 60000 / 1000}`
        } else {
          var displayedScore = `${Math.floor(score / 60000)}:${score % 60000 / 1000 < 10 ? '0' : ''}${score % 60000 / 1000}`
        }
        lbElite.push({
          placementElite,
          displayName,
          score: displayedScore,
          secondaryScore
        })
        placementElite++
      })
    }

    fs.writeFile(`${__dirname}/${name}_normal.csv`, convertToCSV(JSON.stringify(lbNormal, null, 1)), err => {if (err) {console.log(err)}})
    fs.writeFile(`${__dirname}/${name}_elite.csv`, convertToCSV(JSON.stringify(lbElite, null, 1)), err => {if (err) {console.log(err)}})
  }
}

main()