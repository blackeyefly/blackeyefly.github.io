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
  
  bossesJson.body.map(async x => {
    const id = x.id
    const name = x.name
    let lbNormal = []
    let lbElite = []
    let placementNormal = 1
    let placementElite = 1

    for (let i = 1; i <= 40; i++) {
      const pageNormal = await fetch(`https://data.ninjakiwi.com/btd6/bosses/${id}/leaderboard/standard/1?page=${i}`)
      const pageJsonNormal = await pageNormal.json()

      const pageElite = await fetch(`https://data.ninjakiwi.com/btd6/bosses/${id}/leaderboard/elite/1?page=${i}`)
      const pageJsonElite = await pageElite.json()

      if (pageJsonNormal && pageJsonElite && pageJsonNormal.body && pageJsonElite.body) {
        pageJsonNormal.body.map(({
          displayName,
          score,
        }) => {
          lbNormal.push({
            placementNormal,
            displayName,
            // score: `${Math.floor(score / 60000)}:${score % 60000 / 1000 < 10 ? '0' : ''}${score % 60000 / 1000}`,
            score
          })
          placementNormal++
        })

        pageJsonElite.body.map(({
          displayName,
          score,
        }) => {
          lbElite.push({
            placementElite,
            displayName,
            // score: `${Math.floor(score / 60000)}:${score % 60000 / 1000 < 10 ? '0' : ''}${score % 60000 / 1000}`,
            score
          })
          placementElite++
        })
        
      }
    }

    fs.writeFile(`${__dirname}/${name}_normal.csv`, convertToCSV(JSON.stringify(lbNormal, null, 1)), err => {if (err) {console.log(err)}})
    fs.writeFile(`${__dirname}/${name}_elite.csv`, convertToCSV(JSON.stringify(lbElite, null, 1)), err => {if (err) {console.log(err)}})
  })
}

main()