import _ from "lodash";
import { Buff } from "./Buff";
import Difficulty from "./Difficulty";
import MK from "./MK";
import { TowerType } from "./Tower";

type EnumDictionary<T extends string | symbol | number, U> = {
    [K in T]: U;
};

type Upgrades = number[][];

const baseCosts: EnumDictionary<TowerType, number> = {
    [TowerType.Farm]: 1250,
}

const baseUpgradeCosts: EnumDictionary<TowerType, Upgrades> = {
    [TowerType.Farm]: [
        [500, 600, 3000, 19000, 100000],
        [300, 800, 3800, 7500, 100000],
        [250, 200, 2900, 15000, 60000]
    ]
}

export default class Utils {

    static round5(n: number) {
        return Math.round(n / 5) * 5;
    }

    static ceil5(n: number) {
        return Math.ceil(n / 5) * 5;
    }

    static floor5(n: number) {
        return Math.floor(n / 5) * 5;
    }

    private static sumCost(
        upgrades: [number, number, number],
        baseCost: number, upgradeCosts: Upgrades
    ) {
        return baseCost + _.sum(_.flatten(_.zipWith(
            upgradeCosts,
            upgrades,
            _.take
        )));
    }

    // There is some rounding weirdness on non-Medium difficulties and with discounts. May be off by small amounts.
    static cost(
        towerType: TowerType,
        upgrades: [number, number, number],
        mk: MK = MK.On,
        difficulty: Difficulty = Difficulty.Medium,
        buffs: Buff = new Buff()
    ) {
        var villageDiscount: number = [0, 0.15, 0.2, 0.25, 0.1][buffs.discountVillage] + (buffs.discountVillage && MK.On ? 0.02 : 0)

        var cost: number = Utils.floor5(
            baseCosts[towerType] *
            difficulty *
            (mk && [TowerType.Farm].includes(towerType) ? 0.98 : 1) *
            (1 - villageDiscount)
        ) - (mk && towerType === TowerType.Farm && buffs.firstFarm ? 100 : 0);

        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < upgrades[i]; j++) {
                cost += Utils.round5(baseUpgradeCosts[towerType][i][j] * difficulty * (j < 3 ? 1 - villageDiscount : 1));
            }
        }

        return cost;
    }

    static assertValidUpgrades(upgrades: [number, number, number]): void {
        if (upgrades.some(n => (
            !Number.isInteger(n)
        ))) {
            throw new Error("Invalid Tower Upgrades")
        }

        if (upgrades.some(n => (
            n < 0 || n > 5
        ))) {
            throw new Error("Invalid Tower Upgrades")
        }

        if (upgrades.every(n => (
            n > 0
        ))) {
            throw new Error("Invalid Tower Upgrades")
        }

        if (upgrades.filter(n => (
            n > 2
        )).length > 1) {
            throw new Error("Invalid Tower Upgrades")
        }
    }

    static toTitleCase(str: string) {
        return str.replace(
          /\w\S*/g,
          function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
          }
        );
      }
}