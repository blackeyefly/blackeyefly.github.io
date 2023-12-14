import os

def main():
    bossTypes = ['normal', 'elite']
    placement = 4

    for type in bossTypes:
        names = []
        count = 0
        for root,dirs,files in os.walk('.'):
            for file in files:
                if file.endswith(type + ".csv") or file.endswith(type + "_1p.csv"):
                    count += 1
                    f = open(file, 'r')
                    lines = f.readlines()
                    for i in range(placement, placement + 1):
                        player = lines[i].split(',')[-1]
                        # for _ in range(2 ** (placement - i)):
                        #     names.append(player.lower())
                        names.append(player.lower())
                    f.close()

        playerList = list(map(lambda elem: [elem, names.count(elem)], set(names)))
        playerList.sort(key = lambda x: x[1], reverse = True)
        print(f"Number of top {placement} placements in last {count} {type} events")
        for i in playerList:
            print(f"{i[0]}: {i[1]}")
            pass

main()