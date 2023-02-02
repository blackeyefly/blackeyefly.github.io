import { Buff } from "../models/Buff";
import Difficulty from "../models/Difficulty";
import MK from "../models/MK";
import { TowerType } from "../models/Tower";
import Utils from "../models/utils";


const baseFarmCosts = [
    1250,
    [500, 600, 3000, 19000, 100000],
    [300, 800, 3800, 7500, 100000],
    [250, 200, 2900, 15000, 60000]
]

describe('Sums upgrades properly', () => {
    test('calculates 420 farm', () => {
        expect(Utils.cost(TowerType.Farm, [4, 2, 0])
        ).toBe(25425)
    })

    test('calculates 003 farm', () => {
        expect(Utils.cost(TowerType.Farm, [0, 0, 3], MK.On, Difficulty.Easy)
        ).toBe(3890)
    })

    test('calculates discounted 023 farm', () => {
        expect(Utils.cost(TowerType.Farm, [0, 2, 3], MK.On, Difficulty.Medium, new Buff(1, false))
        ).toBe(4710)
    })
});