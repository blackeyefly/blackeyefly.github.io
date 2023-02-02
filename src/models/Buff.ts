import { TowerType } from "./utils";

export type Buff = {
    discountVillage: number;
    overclock: boolean;
    ultraboosts: number;
    firstFarm: boolean;
    firstMilitary: boolean;
    city: boolean;
    fertilizer: boolean;
    central: boolean;
    centralMarkets: number;
    tradeEmpireMerchantmen: number;
    tradeEmpireFavored: number;
}

export function createBuff(
    discountVillage: number = 0,
    firstFarm: boolean = false,
    overclock: boolean = false,
    ultraboosts: number = 0,
    city: boolean = false,
    fertilizer: boolean = false,
    central: boolean = false,
    centralMarkets: number = 0,
    firstMilitary: boolean = false,
    tradeEmpireMerchantmen: number = 0,
    tradeEmpireFavored: number = 0,
): Buff {
    return {
        discountVillage,
        firstFarm,
        overclock,
        ultraboosts,
        city,
        fertilizer,
        central,
        centralMarkets,
        firstMilitary,
        tradeEmpireMerchantmen,
        tradeEmpireFavored,
    }
}

export function fixBuffs(type: TowerType, buff: Buff): Buff {
    if (type === TowerType.Farm) {
        return {
            ...buff,
            tradeEmpireFavored: 0,
            tradeEmpireMerchantmen: 0,
            centralMarkets: 0,
        }    
    } else if (type === TowerType.Buccaneer) {
        return {
            ...buff,
            overclock: false,
            ultraboosts: 0,
            central: false,
            fertilizer: false,
            firstFarm: false,
        }
    } else {
        return buff;
    }
}