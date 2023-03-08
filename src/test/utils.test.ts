import { createBuff } from "../models/Buff";
import Difficulty from "../models/Difficulty";
import MK from "../models/MK";
import { Tower, TowerType } from "../models/Tower";
import Utils from "../models/utils";

describe('Sums upgrades properly', () => {
    test('calculates 420 farm', () => {
        expect(Utils.cost(new Tower(TowerType.Farm, [4, 2, 0]))
        ).toBe(25425)
    })

    test('calculates 003 farm', () => {
        expect(Utils.cost(new Tower(TowerType.Farm, [0, 0, 3], MK.On, Difficulty.Easy))
        ).toBe(3890)
    })

    test('calculates discounted 023 farm', () => {
        expect(Utils.cost(new Tower(TowerType.Farm, [0, 2, 3], MK.On, Difficulty.Medium, createBuff(1, false)))
        ).toBe(4710)
    })
});