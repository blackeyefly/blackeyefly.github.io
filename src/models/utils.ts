import _ from "lodash";
import { Buff, createBuff } from "./Buff";
import Difficulty from "./Difficulty";
import MK from "./MK";

export enum TowerType {
    Farm = "Farm",
    Engineer = "Engineer",
    Buccaneer = "Buccaneer",
    None = "",
}

type EnumDictionary<T extends string | symbol | number, U> = {
    [K in T]: U;
};

type Upgrades = number[][];

const baseCosts: EnumDictionary<TowerType, number> = {
    [TowerType.Farm]: 1250,
    [TowerType.Engineer]: 400,
    [TowerType.Buccaneer]: 500,
    [TowerType.None]: 0
}

const baseUpgradeCosts: EnumDictionary<TowerType, Upgrades> = {
    [TowerType.Farm]: [
        [500, 600, 3000, 19000, 100000],
        [300, 800, 3800, 7500, 100000],
        [250, 200, 2900, 15000, 60000],
    ],
    [TowerType.Engineer]: [
        [500, 400, 575, 2500, 32000],
        [250, 350, 850, 13500, 105000],
        [450, 220, 500, 3500, 54000],
    ],
    [TowerType.Buccaneer]: [
        [350, 550, 2950, 7200, 25000],
        [550, 500, 900, 4900, 26000],
        [180, 400, 2300, 5500, 23000],
    ],
    [TowerType.None]: []
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
        buffs: Buff = createBuff()
    ) {
        var villageDiscount: number = [0, 0.15, 0.2, 0.25, 0.1][buffs.discountVillage] + (buffs.discountVillage && MK.On ? 0.02 : 0)

        var cost: number = Utils.floor5(
            baseCosts[towerType] *
            difficulty *
            (mk && [TowerType.Farm].includes(towerType) ? 0.98 : 1) *
            (mk && [TowerType.Buccaneer].includes(towerType) && buffs.firstMilitary ? 2/3 : 1) *
            (mk && [TowerType.Buccaneer].includes(towerType) ? 0.95 : 1) *
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
        const result = str.replace(/([A-Z])/g, " $1");
        return result.charAt(0).toUpperCase() + result.substring(1).toLowerCase();
      }

    static enumFromStringValue<T> (enm: { [s: string]: T}, value: string): T | undefined {
    return (Object.values(enm) as unknown as string[]).includes(value)
        ? value as unknown as T
        : undefined;
    }
}