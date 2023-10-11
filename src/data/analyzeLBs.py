import os

def main():
    bossTypes = ['normal', 'elite']
    placement = 3

    for type in bossTypes:
        names = []
        count = 0
        for root,dirs,files in os.walk('.'):
            for file in files:
                if file.endswith(type + ".csv"):
                    count += 1
                    f = open(file, 'r')
                    lines = f.readlines()
                    for i in range(1, placement + 1):
                        player = lines[i].split(',')[1]
                        for _ in range(2 ** (placement - i)):
                            names.append(player)
                    f.close()

        playerList = list(map(lambda elem: [elem, names.count(elem)], set(names)))
        playerList.sort(key = lambda x: x[1], reverse = True)
        print(f"Number of top {placement} placements in last 20 {type} events")
        for i in playerList:
            print(f"{i[0]}: {i[1]}")
            pass

main()