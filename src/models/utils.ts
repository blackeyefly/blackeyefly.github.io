import Difficulty from "./Difficulty";
import MK from "./MK";
import { Tower } from "./Tower";

export enum TowerType {
    Dart = "Dart",
    Boomerang = "Boomerang",
    Bomb = "Bomb",
    Tack = "Tack",
    Ice = "Ice",
    Glue = "Glue",
    Sniper = "Sniper",
    Sub = "Sub",
    Buccaneer = "Buccaneer",
    Ace = "Ace",
    Heli = "Heli",
    Mortar = "Mortar",
    Dartling = "Dartling",
    Wizard = "Wizard",
    Super = "Super",
    Ninja = "Ninja",
    Alchemist = "Alchemist",
    Druid = "Druid",
    Farm = "Farm",
    Spike = "Spike",
    Village = "Village",
    Engineer = "Engineer",
    None = "",
}

type EnumDictionary<T extends string | symbol | number, U> = {
    [K in T]: U;
};

type Upgrades = number[][];

const baseCosts: EnumDictionary<TowerType, number> = {
    [TowerType.None]: 0,
    [TowerType.Dart]: 200,
    [TowerType.Boomerang]: 325,
    [TowerType.Bomb]: 525,
    [TowerType.Tack]: 280,
    [TowerType.Ice]: 500,
    [TowerType.Glue]: 225,
    [TowerType.Sniper]: 350,
    [TowerType.Sub]: 325,
    [TowerType.Buccaneer]: 500,
    [TowerType.Ace]: 800,
    [TowerType.Heli]: 1600,
    [TowerType.Mortar]: 750,
    [TowerType.Dartling]: 850,
    [TowerType.Wizard]: 375,
    [TowerType.Super]: 2500,
    [TowerType.Ninja]: 500,
    [TowerType.Alchemist]: 550,
    [TowerType.Druid]: 400,
    [TowerType.Spike]: 1000,
    [TowerType.Farm]: 1250,
    [TowerType.Village]: 1200,
    [TowerType.Engineer]: 400,
}

const baseUpgradeCosts: EnumDictionary<TowerType, Upgrades> = {
    [TowerType.None]: [[0, 0, 0, 0, 0],[0, 0, 0, 0, 0],[0, 0, 0, 0, 0],],
    [TowerType.Dart]: [
        [140, 220, 300, 1800, 15000],
        [100, 190, 400, 8000, 45000],
        [90, 200, 625, 2000, 23500],
    ],
    [TowerType.Boomerang]: [
        [200, 280, 1300, 3000, 32400],
        [175, 250, 1450, 4200, 35000],
        [100, 300, 1300, 2400, 50000],
    ],
    [TowerType.Bomb]: [
        [350, 650, 1200, 3600, 55000],
        [250, 400, 1100, 3200, 25000],
        [200, 300, 800, 2800, 35000],
    ],
    [TowerType.Tack]: [
        [150, 300, 600, 3500, 45500],
        [100, 225, 550, 2700, 15000],
        [100, 100, 450, 3200, 20000],
    ],
    [TowerType.Ice]: [
        [150, 350, 1500, 2200, 28000],
        [225, 450, 2800, 3000, 20000],
        [175, 225, 2250, 2750, 30000],
    ],
    [TowerType.Glue]: [
        [200, 300, 2500, 5000, 22000],
        [100, 1650, 2500, 3450, 15000],
        [280, 400, 3400, 3000, 28000],
    ],
    [TowerType.Sniper]: [
        [350, 1500, 3000, 5400, 32000],
        [300, 450, 3200, 7200, 14500],
        [400, 400, 3000, 4250, 14500],
    ],
    [TowerType.Sub]: [
        [130, 500, 500, 2500, 32000],
        [450, 300, 1400, 13000, 32000],
        [450, 1000, 1100, 3000, 25000],
    ],
    [TowerType.Buccaneer]: [
        [350, 550, 2950, 7200, 25000],
        [550, 500, 900, 4900, 26000],
        [180, 400, 2300, 5500, 23000],
    ],
    [TowerType.Ace]: [
        [650, 650, 1000, 3000, 41500],
        [200, 350, 900, 18000, 30000],
        [500, 300, 2800, 23400, 85000],
    ],
    [TowerType.Heli]: [
        [800, 500, 1750, 19600, 45000],
        [300, 600, 3500, 10500, 30000],
        [250, 350, 3000, 8500, 35000],
    ],
    [TowerType.Mortar]: [
        [500, 500, 900, 8000, 36000],
        [300, 500, 900, 5500, 30000],
        [200, 500, 700, 11000, 40000],
    ],
    [TowerType.Dartling]: [
        [300, 900, 3750, 11000, 80000],
        [250, 950, 5100, 5250, 60000],
        [150, 1200, 3400, 12000, 58000],
    ],
    [TowerType.Wizard]: [
        [150, 450, 1300, 10000, 32000],
        [300, 950, 3000, 6000, 52500],
        [300, 300, 1500, 2800, 26500],
    ],
    [TowerType.Super]: [
        [2500, 3000, 20000, 100000, 500000],
        [1000, 1400, 7000, 19000, 90000],
        [3000, 1200, 5600, 60000, 200000],
    ],
    [TowerType.Ninja]: [
        [300, 350, 850, 2750, 35000],
        [350, 500, 900, 5200, 22000],
        [250, 400, 2250, 5000, 40000],
    ],
    [TowerType.Alchemist]: [
        [250, 350, 1250, 3000, 60000],
        [250, 475, 3000, 4500, 45000],
        [650, 450, 1000, 2750, 40000],
    ],
    [TowerType.Druid]: [
        [250, 1000, 1650, 4500, 65000],
        [250, 350, 950, 5000, 35000],
        [100, 300, 600, 2500, 45000],
    ],
    [TowerType.Spike]: [
        [800, 600, 2300, 9500, 125000],
        [600, 800, 2500, 5000, 40000],
        [150, 400, 1400, 3500, 30000],
    ],
    [TowerType.Farm]: [
        [500, 600, 3000, 19000, 100000],
        [300, 800, 3800, 7500, 100000],
        [250, 200, 2900, 15000, 60000],
    ],
    [TowerType.Village]: [
        [400, 1500, 800, 2500, 25000],
        [250, 2000, 7500, 20000, 40000],
        [500, 500, 10000, 3000, 0]
    ],
    [TowerType.Engineer]: [
        [500, 400, 575, 2500, 32000],
        [250, 350, 850, 13500, 72000],
        [450, 220, 500, 3500, 54000],
    ],
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

    // There is some rounding weirdness on non-Medium difficulties and with discounts. May be off by small amounts.
    static cost(
        tower: Tower,
        mk: MK = MK.On,
        difficulty: Difficulty = Difficulty.Medium,
    ) {
        const villageDiscount: number = [0, 0.15, 0.2, 0.25, 0.1][tower.buffs.discountVillage] + (tower.buffs.discountVillage && MK.On ? 0.02 : 0)

        let cost: number = Utils.floor5(
            baseCosts[tower.type] *
            difficulty *
            (mk && [TowerType.Farm, TowerType.Village].includes(tower.type) ? 0.98 : 1) *
            (mk && [
                TowerType.Sniper,
                TowerType.Sub,
                TowerType.Buccaneer,
                TowerType.Ace,
                TowerType.Heli,
                TowerType.Mortar,
                TowerType.Dartling,
            ].includes(tower.type) ? 0.95 * (tower.buffs.firstMilitary ? 2 / 3 : 1) : 1) *
            (1 - villageDiscount)
        ) - (mk && tower.type === TowerType.Farm && tower.buffs.firstFarm ? 100 : 0);

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < tower.upgrades[i]; j++) {
                cost += Utils.round5(baseUpgradeCosts[tower.type][i][j] * difficulty * (j < 3 ? 1 - villageDiscount : 1));
            }
        }

        if (tower.type === TowerType.Village && tower.upgrades[2] === 5) {
            cost += 5000 * tower.farmsSacrificed;
        }

        return cost;
    }
    
    private static numberOfBananas(tower: Tower): number {
        let bananas: number;

        if (tower.upgrades[0] >= 4) {
            bananas = 5;
        } else if (tower.upgrades[2] >= 3) {
            bananas = 16 + 2 * tower.upgrades[0]
        } else if (tower.upgrades[0] === 3) {
            bananas = 16;
        } else {
            bananas = 4 + 2 * tower.upgrades[0];
        }

        bananas = Math.ceil(bananas * (1 + (tower.buffs.overclock ? 2/3 : 0) + (tower.buffs.ultraboosts * 1/15)));

        return bananas;
    }

    private static bananaValue(tower: Tower, mk: MK = MK.Off): number {
        let value: number;

        if (tower.upgrades[0] === 5) {
            value = 1200;
        } else if (tower.upgrades[0] === 4) {
            value = 300;
        } else if (tower.upgrades[2] >= 4) {
            value = 70;
        } else {
            value = 20;
        }

        if (tower.buffs.central && tower.upgrades[0] >= 4) {
            value *= 1.25;
        }

        if (tower.buffs.fertilizer && tower.upgrades[1] < 3 && tower.upgrades[2] < 3) {
            value *= 1.25;
        }

        return Math.floor(value * (tower.upgrades[1] >= 2 ? (mk ? 1.3 : 1.25) : 1) * (tower.buffs.city ? 1.15 : 1));
    }

    static incomePerRound(
        tower: Tower,
        mk: MK
    ): number {
        if (tower.type === TowerType.Farm) {
            return Utils.numberOfBananas(tower) * Utils.bananaValue(tower, mk) + (tower.upgrades[2] === 5 ? 4000 : 0) * (tower.buffs.city ? 1.15 : 1);
        } else if (tower.type === TowerType.Buccaneer) {
            if (tower.upgrades[2] < 3) {
                return 0;
            }
    
            let income = 0;
            if (tower.upgrades[2] === 3) {
                income = 200;
            } else if (tower.upgrades[2] === 4) {
                income = 500;
            } else if (tower.upgrades[2] === 5) {
                income = 800;
            }
    
            income += mk === MK.On ? 20 : 0;
            income *= 1 + 0.1 * Math.min(tower.buffs.centralMarkets, 10);
            income += 10 * tower.buffs.tradeEmpireMerchantmen;
            income += 10 * tower.buffs.tradeEmpireFavored;
            income *= tower.buffs.city ? 1.15 : 1;
            return Math.floor(income);
        } else if (tower.type === TowerType.Village) {
            if (tower.upgrades[2] < 5) {
                return 0;
            } else {
                return Math.max(200 * Math.floor(tower.sacrificeValue / 2000), 200);
            }
        } else {
            return 0;
        }
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