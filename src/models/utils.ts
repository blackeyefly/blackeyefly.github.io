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
    BeastHandler = "Beast Handler",
    None = "",
}

type EnumDictionary<T extends string | symbol | number, U> = {
    [K in T]: U;
};

type Upgrades = number[][];

const baseCosts: EnumDictionary<TowerType, number> = {
    [TowerType.None]: 0,
    [TowerType.Dart]: 200,
    [TowerType.Boomerang]: 315,
    [TowerType.Bomb]: 525,
    [TowerType.Tack]: 260,
    [TowerType.Ice]: 500,
    [TowerType.Glue]: 225,
    [TowerType.Sniper]: 350,
    [TowerType.Sub]: 325,
    [TowerType.Buccaneer]: 400,
    [TowerType.Ace]: 800,
    [TowerType.Heli]: 1600,
    [TowerType.Mortar]: 750,
    [TowerType.Dartling]: 850,
    [TowerType.Wizard]: 325,
    [TowerType.Super]: 2500,
    [TowerType.Ninja]: 400,
    [TowerType.Alchemist]: 550,
    [TowerType.Druid]: 400,
    [TowerType.Spike]: 1000,
    [TowerType.Farm]: 1250,
    [TowerType.Village]: 1200,
    [TowerType.Engineer]: 350,
    [TowerType.BeastHandler]: 250,
}

const paragonCosts: EnumDictionary<TowerType, number> = {
    [TowerType.None]: 0,
    [TowerType.Dart]: 150000,
    [TowerType.Boomerang]: 275000,
    [TowerType.Bomb]: 0,
    [TowerType.Tack]: 0,
    [TowerType.Ice]: 0,
    [TowerType.Glue]: 0,
    [TowerType.Sniper]: 0,
    [TowerType.Sub]: 400000,
    [TowerType.Buccaneer]: 550000,
    [TowerType.Ace]: 900000,
    [TowerType.Heli]: 0,
    [TowerType.Mortar]: 0,
    [TowerType.Dartling]: 0,
    [TowerType.Wizard]: 750000,
    [TowerType.Super]: 0,
    [TowerType.Ninja]: 500000,
    [TowerType.Alchemist]: 0,
    [TowerType.Druid]: 0,
    [TowerType.Spike]: 0,
    [TowerType.Farm]: 0,
    [TowerType.Village]: 0,
    [TowerType.Engineer]: 650000,
    [TowerType.BeastHandler]: 0,
}

const baseUpgradeCosts: EnumDictionary<TowerType, Upgrades> = {
    [TowerType.None]: [[0, 0, 0, 0, 0],[0, 0, 0, 0, 0],[0, 0, 0, 0, 0],],
    [TowerType.Dart]: [
        [140, 220, 300, 1800, 15000],
        [100, 190, 400, 7500, 45000],
        [90, 200, 625, 2000, 21500],
    ],
    [TowerType.Boomerang]: [
        [200, 280, 600, 3000, 29400],
        [175, 250, 1450, 4200, 35000],
        [100, 300, 1300, 2400, 50000],
    ],
    [TowerType.Bomb]: [
        [350, 650, 1200, 3200, 55000],
        [250, 400, 1100, 3100, 25500],
        [200, 300, 800, 2800, 28000],
    ],
    [TowerType.Tack]: [
        [150, 300, 600, 3500, 45500],
        [100, 225, 550, 2700, 15000],
        [110, 110, 450, 3200, 20000],
    ],
    [TowerType.Ice]: [
        [150, 350, 1500, 2200, 28000],
        [225, 450, 2800, 3800, 19200],
        [175, 225, 2250, 2750, 30000],
    ],
    [TowerType.Glue]: [
        [200, 300, 2500, 5000, 22000],
        [100, 970, 2100, 3850, 16000],
        [280, 400, 3600, 3400, 24000],
    ],
    [TowerType.Sniper]: [
        [350, 1300, 3000, 5650, 32000],
        [250, 450, 2400, 7600, 14500],
        [450, 450, 2900, 4100, 14700],
    ],
    [TowerType.Sub]: [
        [130, 500, 700, 2300, 31000],
        [450, 300, 1350, 13000, 29000],
        [450, 1000, 1100, 3000, 25000],
    ],
    [TowerType.Buccaneer]: [
        [275, 425, 3050, 7200, 25000],
        [550, 500, 900, 4900, 26000],
        [200, 350, 2400, 5500, 23000],
    ],
    [TowerType.Ace]: [
        [650, 650, 1000, 3000, 42500],
        [200, 350, 900, 18000, 30000],
        [500, 550, 2550, 23400, 85000],
    ],
    [TowerType.Heli]: [
        [800, 500, 1750, 19600, 45000],
        [300, 600, 3500, 9500, 30000],
        [250, 350, 3000, 8500, 35000],
    ],
    [TowerType.Mortar]: [
        [500, 500, 900, 8000, 36000],
        [300, 500, 900, 5900, 32000],
        [200, 500, 900, 10500, 40000],
    ],
    [TowerType.Dartling]: [
        [300, 900, 3650, 11100, 80000],
        [250, 950, 4800, 5550, 60000],
        [150, 1200, 3400, 12000, 58000],
    ],
    [TowerType.Wizard]: [
        [150, 450, 1400, 10000, 32000],
        [300, 800, 3000, 7000, 50000],
        [300, 300, 1500, 2800, 26500],
    ],
    [TowerType.Super]: [
        [2000, 2500, 20000, 100000, 500000],
        [1500, 1900, 7500, 25000, 70000],
        [3000, 1200, 5600, 55555, 200000],
    ],
    [TowerType.Ninja]: [
        [350, 350, 900, 2750, 35000],
        [250, 400, 1200, 5200, 22000],
        [300, 450, 2250, 5000, 40000],
    ],
    [TowerType.Alchemist]: [
        [250, 350, 1300, 2950, 60000],
        [250, 475, 3000, 4500, 45000],
        [650, 450, 1000, 2750, 40000],
    ],
    [TowerType.Druid]: [
        [350, 850, 1700, 4500, 65000],
        [250, 350, 1050, 4900, 35000],
        [100, 300, 600, 2500, 45000],
    ],
    [TowerType.Spike]: [
        [800, 600, 2300, 9500, 125000],
        [600, 800, 2500, 5000, 42000],
        [150, 400, 1300, 3600, 30000],
    ],
    [TowerType.Farm]: [
        [500, 600, 3000, 19000, 115000],
        [300, 800, 3800, 7500, 100000],
        [250, 400, 2700, 15000, 70000],
    ],
    [TowerType.Village]: [
        [400, 1500, 800, 2500, 25000],
        [250, 2000, 7500, 20000, 40000],
        [500, 500, 10000, 3000, 0]
    ],
    [TowerType.Engineer]: [
        [500, 400, 575, 2500, 32000],
        [250, 350, 900, 13500, 72000],
        [450, 220, 450, 3600, 48000],
    ],
    [TowerType.BeastHandler]: [
        [160, 810, 2010, 16000, 55000],
        [175, 830, 2065, 9500, 60000],
        [190, 860, 2120, 7800, 30000],
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

    //aka bankers rounding AKA .net default rounding
    static roundEven(n : number) {
        const roundToPlaces = 0;//how many decimal places to round to
        var x = n * Math.pow(10, roundToPlaces);
        var r = Math.round(x);
        var br = Math.abs(x) % 1 === 0.5 ? (r % 2 === 0 ? r : r-1) : r;
        return br / Math.pow(10, roundToPlaces);
    }
    static roundEven5(n : number) {
        return this.roundEven(n / 5) * 5;
    }


    // There is some rounding weirdness on non-Medium difficulties and with discounts. May be off by small amounts.
    static cost(
        tower: Tower,
        mk: MK = MK.On,
        difficulty: Difficulty = Difficulty.Medium,
    ) {
        const oneThirdFraction = 0.33;//this is what they use not 1/3 and not 0.3
        let mkIsOn: boolean = mk === MK.On;
        let villageDiscount: number = [0, 0.15, 0.2, 0.25, 0.1][tower.buffs.discountVillage];

        if (tower.buffs.discountVillage && mkIsOn)
            villageDiscount += 0.02; //Insider Trades

        let baseDiscountPercent: number = villageDiscount;

        let baseCostAbsoluteChange: number = 0;
        switch(tower.type){
            case TowerType.Farm:
                if (mkIsOn && tower.buffs.firstFarm)
                    baseCostAbsoluteChange -= 100; // Farm Subsidy

                if (mkIsOn)
                    baseDiscountPercent += 0.02; // Flat Pack Buildings
            break;
            case TowerType.Village:
                if (mkIsOn)
                    baseDiscountPercent += 0.02; // Flat Pack Buildings
                if (tower.upgrades[2] === 5)
                    baseCostAbsoluteChange += 5000 * tower.farmsSacrificed;
            break;
            case TowerType.Spike:
                if (mkIsOn && tower.buffs.firstSpike)
                    baseCostAbsoluteChange -= 150; // First Last Line of Defense
            break;
            case TowerType.Boomerang:
                if (mkIsOn)
                    baseCostAbsoluteChange -= 50; // Cheap 'Rangs

            break;
            case TowerType.Sniper:
            case TowerType.Sub:
            case TowerType.Buccaneer:
            case TowerType.Ace:
            case TowerType.Heli:
            case TowerType.Mortar:
            case TowerType.Dartling:
                //military towers
                if (mkIsOn)
                    baseDiscountPercent += 0.05;

                if (mkIsOn && tower.buffs.firstMilitary)
                    baseDiscountPercent += oneThirdFraction; //  Military Conscription
            break;



        }

        let cost: number = Utils.roundEven5(((baseCosts[tower.type] * difficulty) + baseCostAbsoluteChange) * (1-baseDiscountPercent) );
        //console.log(` ${tower.type} base cost(&${baseCosts[tower.type]}) * difficulty(${difficulty}) + absoluteChange(&${baseCostAbsoluteChange}) * 1-discount(${baseDiscountPercent}) = ${cost} `);

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < tower.upgrades[i]; j++) {
                let adjustedUpgradeCost = Math.floor( baseUpgradeCosts[tower.type][i][j] * difficulty );
                let upgradeDiscountPercent = j < 3 ? villageDiscount : 0;
                let upgradeCostAbsoluteChange: number = 0;
                switch(tower.type) {
                    case TowerType.Mortar:
                        if ( i === 1 && j === 3 && mkIsOn)
                            upgradeCostAbsoluteChange -= 600; // Budget Battery
                    break;
                    case TowerType.Ninja:
                        if (i === 0 && j === 2 && mkIsOn)
                            upgradeCostAbsoluteChange -= 100; // Cheaper Doubles

                    break;
                    case TowerType.Druid:
                        if (i === 1 && j === 1 && mkIsOn)
                            upgradeCostAbsoluteChange -= 100; //Warm Oak
                    break;
                    case TowerType.Ace:
                        if (j === 4 && mkIsOn)
                            adjustedUpgradeCost = adjustedUpgradeCost - Math.floor(adjustedUpgradeCost * 0.1); // Aeronautic Subsidy
                    break;
                    case TowerType.Spike:
                        if (i === 0 && j === 3 && mkIsOn)
                            upgradeCostAbsoluteChange -= 1500; //Hi-Value Mines
                     break;
                     case TowerType.Glue:
                        if (i === 0 && j === 3 && mkIsOn)
                            upgradeCostAbsoluteChange -= 1000; // Cheaper Solution
                    break;
                    case TowerType.Bomb:
                        if (i === 2 && j === 2 && mkIsOn)
                            upgradeCostAbsoluteChange -= 100; // Budget Clusters
                    break;
                    case TowerType.Sniper:
                        if (i === 0 && j === 3 && mkIsOn)
                            upgradeCostAbsoluteChange -= 1000; // Cheaper Maiming
                    break;
                    case TowerType.Wizard:
                        if ( (i === 0 || i === 2) && j === 0 && mkIsOn)
                        upgradeCostAbsoluteChange -= 25; // Magic Tricks
                    break;
                }

                const upgradeCost = Utils.roundEven5( (adjustedUpgradeCost + upgradeCostAbsoluteChange) * (1 - upgradeDiscountPercent) );
                cost += upgradeCost;
                //console.log(`    upgrade at track ${i+1} tier: ${j+1} base ug cost(&${baseUpgradeCosts[tower.type][i][j]}) * difficulty(${difficulty}) + absoluteChange(&${upgradeCostAbsoluteChange}) * 1-discount(${upgradeDiscountPercent}) = &${upgradeCost} total cost so far: &${cost}`);
        }
        }

        return cost;
    }

    static paragonCost(
        towerType: TowerType,
        difficulty: Difficulty = Difficulty.Medium,
    ) {
        return paragonCosts[towerType] * difficulty;
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
            value *= 1.2;
        }

        return Math.floor(value * (
                (tower.upgrades[1] >= 2 ? (mk === MK.On ? 1.3 : 1.25) : 1) + // More Valuable Bananas
                (tower.buffs.city ? 0.2 : 0))
                );
    }

    static incomePerRound(
        tower: Tower,
        mk: MK
    ): number {
        let mkIsOn: boolean = mk === MK.On;
        if (tower.type === TowerType.Farm) {
            return Utils.numberOfBananas(tower) * Utils.bananaValue(tower, mk) + (tower.upgrades[2] === 5 ? 4000 : 0) * (tower.buffs.city ? 1.2 : 1);
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
    
            income += mkIsOn ? 20 : 0; //trade agreements
            income *= 1 + 0.1 * Math.min(tower.buffs.centralMarkets, 10);
            income += 10 * tower.buffs.tradeEmpireMerchantmen;
            income += 10 * tower.buffs.tradeEmpireFavored;
            income *= tower.buffs.city ? 1.2 : 1;
            return Math.floor(income);
        } else if (tower.type === TowerType.Village) {
            if (tower.upgrades[2] < 5) {
                return 0;
            } else {
                return Math.max(200 * Math.floor(tower.sacrificeValue / 2000), 200) + 2500;
            }
        } else {
            return 0;
        }
    }

    static incomePerAbilty(tower: Tower, mk: MK) {
        let mkIsOn: boolean = mk === MK.On;
        let income = 0;
        if (tower.type === TowerType.Sniper) {
            if (tower.upgrades[1] === 4) {
                income = 1200;
            } else if (tower.upgrades[1] === 5) {
                income = 3000
            }
        } else if (tower.type === TowerType.Heli) {
            if (tower.upgrades[1] === 4) {
                income = mkIsOn ? 1937 : 1550;
            } else if (tower.upgrades[1] === 5) {
                income = mkIsOn ? 5625 : 4500;
            }
        } else if (tower.type === TowerType.Druid) {
            if (tower.upgrades[1] >= 4) {
                income = 320 + 120 * tower.buffs.farmsInRange;
            }
        } else if (tower.type === TowerType.Farm) {
            if (tower.upgrades[1] >= 5) {
                income = 9000 + (mkIsOn ? 1000 : 0);
            }
        }
        return income * (tower.buffs.city && tower.type !== TowerType.Farm ? 1.2 : 1);
    }

    static abilityCooldown(tower: Tower, mk: MK) {
        let cd = 0;
        if (tower.type === TowerType.Sniper) {
            cd = 90;
        } else if (tower.type === TowerType.Heli) {
            cd = 90;
        } else if (tower.type === TowerType.Druid) {
            cd = 60;
        } else if (tower.type === TowerType.Farm) {
            cd = 90;
        }
        return cd * (1 - (tower.buffs.energizer ? 0.2 : 0) - (mk === MK.On ? 0.03 : 0));
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

    static actionFigureMaxValueRound(roundPurchased: number, difficulty: Difficulty, mk: MK) {
        let round = roundPurchased;

        while (this.actionFigureSellValue(roundPurchased, round, difficulty, mk) < 10000000) {
            round++;
        }
        
        return round;
    }

    static actionFigureSellValue(roundPurchased: number, roundSold: number, difficulty: Difficulty, mk: MK, buy = false): number {
        const actionFigureMediumPrice = 650
        let multiplier = this.actionFigureMultiplier(roundPurchased, roundSold) //this returns an array, such that it remains a 32 bit float

        let cost: number;

        if (buy) {
            cost = this.roundEven5(Math.floor(actionFigureMediumPrice * difficulty) * multiplier[0]);
        }
        else {
            const sellmultipliers = new Float32Array([0.95, 0.05]);
            let totalmultiplier = new Float32Array(2)
            totalmultiplier[0] = (multiplier[0] * sellmultipliers[0]); //slight inaccuracies at very large rounds could be caused here
            totalmultiplier[1] = (mk === MK.On ? sellmultipliers[1] : 0); //and here
            cost = Math.ceil(this.floor5(actionFigureMediumPrice * difficulty) * (totalmultiplier[0]+totalmultiplier[1]));
        }
        return Math.min(cost, 1e7)
    }

    static actionFigureMultiplier(roundPurchased: number, roundSold: number): Float32Array { 
        //the game appears to store many values as floats, in my testing all values in this function are 32 bit floats and a pow function was used for each bracket

        let multiplier = new Float32Array([1]);
    
        const roundmultiplier = new Float32Array([1.1, 1.05, 1.02]);
        const powers = new Float32Array(3);
        /*
        for(let i = roundPurchased; i < roundSold; i++) {
            multiplier[0] *= (i <= 30 ? roundmultiplier[0] : (i <= 80 ? roundmultiplier[1] : roundmultiplier[2]));
        }
        */
        
        powers[0] = Math.max(1.0, Math.pow(roundmultiplier[0], Math.min(31, roundSold) - roundPurchased));                  //bracket 1 (r1-31)
        powers[1] = Math.max(1.0, Math.pow(roundmultiplier[1], Math.min(50, roundSold - Math.max(31, roundPurchased))));    //bracket 2 (r31-81)
        powers[2] = Math.max(1.0, Math.pow(roundmultiplier[2], roundSold - Math.max(81, roundPurchased)));                  //bracket 3 (r81-...)
        
        multiplier[0] *= powers[0];
        multiplier[0] *= powers[1];
        multiplier[0] *= powers[2];
        
        return multiplier;
    }
}
