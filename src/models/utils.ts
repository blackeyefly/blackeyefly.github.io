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
    Desperado = "Desperado",
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
    Mermonkey = "Mermonkey",
    Farm = "Farm",
    Spike = "Spike",
    Village = "Village",
    Engineer = "Engineer",
    BeastHandler = "Beast Handler",
    None = "",
}

export enum BossType{
    Bloonarius = "Bloonarius",
    Lych = "Lych",
    Vortex = "Vortex",
    Dreadbloon = "Dreadbloon",
    Phayze = "Phayze",
    Blastapopoulos = "Blastapopoulos",
}

type EnumDictionary<T extends string | symbol | number, U> = {
    [K in T]: U;
};

type Upgrades = number[][];

type BossHPs = number[][];

type BossSegments = number[];

const baseCosts: EnumDictionary<TowerType, number> = {
    [TowerType.None]: 0,
    [TowerType.Dart]: 200,
    [TowerType.Boomerang]: 315,
    [TowerType.Bomb]: 375,
    [TowerType.Tack]: 260,
    [TowerType.Ice]: 400,
    [TowerType.Glue]: 225,
    [TowerType.Desperado]: 300,
    [TowerType.Sniper]: 350,
    [TowerType.Sub]: 325,
    [TowerType.Buccaneer]: 400,
    [TowerType.Ace]: 800,
    [TowerType.Heli]: 1500,
    [TowerType.Mortar]: 750,
    [TowerType.Dartling]: 850,
    [TowerType.Wizard]: 250,
    [TowerType.Super]: 2500,
    [TowerType.Ninja]: 400,
    [TowerType.Alchemist]: 550,
    [TowerType.Druid]: 400,
    [TowerType.Mermonkey]: 375,
    [TowerType.Spike]: 1000,
    [TowerType.Farm]: 1250,
    [TowerType.Village]: 1200,
    [TowerType.Engineer]: 350,
    [TowerType.BeastHandler]: 250,
}

const paragonCosts: EnumDictionary<TowerType, number> = {
    [TowerType.None]: 0,
    [TowerType.Dart]: 150000,
    [TowerType.Boomerang]: 250000,
    [TowerType.Bomb]: 0,
    [TowerType.Tack]: 200000,
    [TowerType.Ice]: 0,
    [TowerType.Glue]: 0,
    [TowerType.Desperado]: 0,
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
    [TowerType.Mermonkey]: 0,
    [TowerType.Spike]: 800000,
    [TowerType.Farm]: 0,
    [TowerType.Village]: 0,
    [TowerType.Engineer]: 650000,
    [TowerType.BeastHandler]: 0,
}

const baseUpgradeCosts: EnumDictionary<TowerType, Upgrades> = {
    [TowerType.None]: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0],],
    [TowerType.Dart]: [
        [140, 200, 320, 1800, 15000],
        [100, 190, 450, 7200, 45000],
        [90, 200, 575, 2050, 21500],
    ],
    [TowerType.Boomerang]: [
        [200, 280, 600, 2000, 32500],
        [175, 250, 1250, 4200, 35000],
        [100, 300, 1300, 2400, 50000],
    ],
    [TowerType.Bomb]: [
        [250, 650, 1100, 2800, 55000],
        [250, 400, 1000, 3450, 28000],
        [200, 300, 700, 2500, 23000],
    ],
    [TowerType.Tack]: [
        [150, 300, 600, 3500, 45500],
        [100, 225, 550, 2700, 15000],
        [110, 110, 450, 3200, 20000],
    ],
    [TowerType.Ice]: [
        [150, 350, 1500, 2300, 28000],
        [200, 300, 2750, 4000, 16000],
        [150, 200, 1900, 2750, 30000],
    ],
    [TowerType.Glue]: [
        [200, 300, 2000, 5000, 22500],
        [100, 970, 1950, 4000, 16000],
        [280, 400, 3600, 4000, 24000],
    ],
    [TowerType.Desperado]: [
        [250, 200, 1200, 5800, 17500],
        [150, 500, 3000, 8000, 42000],
        [220, 280, 2100, 9500, 31000],
    ],
    [TowerType.Sniper]: [
        [350, 1300, 2500, 6000, 32000],
        [250, 450, 2100, 7600, 14000],
        [450, 450, 2900, 4100, 14700],
    ],
    [TowerType.Sub]: [
        [130, 500, 700, 2300, 28000],
        [450, 300, 1350, 13000, 29000],
        [450, 1000, 1100, 2500, 25000],
    ],
    [TowerType.Buccaneer]: [
        [275, 425, 3050, 8000, 24500],
        [550, 500, 900, 3900, 27000],
        [200, 350, 2400, 5500, 23000],
    ],
    [TowerType.Ace]: [
        [450, 550, 1000, 3300, 42500],
        [200, 350, 900, 18000, 26000],
        [500, 550, 2550, 23400, 85000],
    ],
    [TowerType.Heli]: [
        [800, 500, 1850, 19600, 45000],
        [300, 600, 3500, 9500, 30000],
        [250, 350, 3400, 8500, 35000],
    ],
    [TowerType.Mortar]: [
        [500, 500, 825, 7200, 36000],
        [300, 500, 900, 6500, 38000],
        [200, 500, 900, 9500, 40000],
    ],
    [TowerType.Dartling]: [
        [300, 900, 3000, 11750, 75000],
        [250, 950, 4500, 5850, 65000],
        [150, 1200, 3400, 12000, 58000],
    ],
    [TowerType.Wizard]: [
        [175, 450, 1450, 10000, 32000],
        [300, 800, 3300, 6000, 50000],
        [300, 300, 1500, 2800, 26500],
    ],
    [TowerType.Super]: [
        [2000, 2500, 20000, 100000, 500000],
        [1500, 1900, 7500, 25000, 70000],
        [3000, 1200, 5600, 55555, 165650],
    ],
    [TowerType.Ninja]: [
        [350, 350, 900, 2750, 35000],
        [250, 400, 1200, 5200, 22000],
        [300, 450, 2250, 5000, 40000],
    ],
    [TowerType.Alchemist]: [
        [250, 350, 1400, 2850, 48000],
        [250, 475, 2800, 4200, 45000],
        [650, 450, 1000, 2750, 40000],
    ],
    [TowerType.Druid]: [
        [350, 850, 1700, 4500, 60000],
        [250, 350, 1050, 4900, 35000],
        [100, 300, 600, 2350, 45000],
    ],
    [TowerType.Mermonkey]: [
        [150, 250, 1600, 4200, 23000],
        [200, 300, 2300, 8000, 52000],
        [200, 380, 2000, 7600, 25000],
    ],
    [TowerType.Spike]: [
        [800, 600, 2300, 9500, 125000],
        [600, 800, 2500, 7000, 41000],
        [150, 400, 1300, 3600, 30000],
    ],
    [TowerType.Farm]: [
        [500, 600, 3000, 19000, 115000],
        [300, 800, 3650, 7200, 100000],
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
        [450, 220, 450, 3600, 45000],
    ],
    [TowerType.BeastHandler]: [
        [160, 810, 2010, 12500, 45000],
        [175, 830, 2065, 9500, 60000],
        [190, 860, 2120, 9000, 30000],
    ],
}

const baseBossHPs: EnumDictionary<BossType, BossHPs> = {
    [BossType.Bloonarius]: [
        [20000, 75000, 350000, 750000, 3000000],
        [50000, 300000, 2000000, 8000000, 40000000]
    ],
    [BossType.Lych]: [
        [14000, 52500, 220000, 525000, 2100000],
        [30000, 180000, 1100000, 4800000, 24000000]
    ],
    [BossType.Vortex]: [
        [20000, 62800, 294000, 628000, 2512000],
        [41800, 251000, 1675000, 6700000, 33500000]
    ],
    [BossType.Dreadbloon]: [
        [7500, 25000, 120000, 260000, 1000000],
        [15000, 90000, 650000, 2625000, 12500000]
    ],
    [BossType.Phayze]: [
        [10000, 37500, 175000, 375000, 1500000],
        [20000, 120000, 800000, 3200000, 16000000]
    ],
    [BossType.Blastapopoulos]: [
        [17500, 65000, 300000, 650000, 3000000],
        [43000, 270000, 1700000, 7000000, 35000000]
    ],
}

const bossSegments: EnumDictionary<BossType, BossSegments> = {
    [BossType.Bloonarius]: [4, 8],
    [BossType.Lych]: [6, 8],
    [BossType.Vortex]: [4, 8],
    [BossType.Dreadbloon]: [4, 4],
    [BossType.Phayze]: [4, 6],
    [BossType.Blastapopoulos]: [5, 8],
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
        if (tower.type === TowerType.Village && tower.upgrades[2] === 5) {
            cost += 5000 * tower.buffs.farmsInRange;
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
                return Math.max(200 * Math.floor(tower.buffs.farmsValue / 2000), 200) + 1000;
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
                income = 1100;
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

    static bossHP(boss: BossType, elite: boolean, tier: number, percentage: number, players: number): number {
        if (players < 1 || players > 4) {
            throw new Error("Invalid number of players");
        }
        if (tier < 1 || tier > 5) {
            throw new Error("Invalid tier");
        }

        let hp = baseBossHPs[boss][elite ? 1 : 0][tier - 1];
        hp = hp * (percentage / 100) * (1 + 0.2 * (players - 1));
        return hp;
    }

    static bossSegmentHP(boss: BossType, elite: boolean, tier: number, percentage: number, players: number): number {
        if (players < 1 || players > 4) {
            throw new Error("Invalid number of players");
        }
        if (tier < 1 || tier > 5) {
            throw new Error("Invalid tier");
        }

        let hp = baseBossHPs[boss][elite ? 1 : 0][tier - 1] / bossSegments[boss][elite ? 1 : 0];
        hp = hp * (percentage / 100) * (1 + 0.2 * (players - 1));
        return hp;
    }
}
