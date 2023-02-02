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
    discountVillage = 0,
    firstFarm = false,
    overclock = false,
    ultraboosts = 0,
    city = false,
    fertilizer = false,
    central = false,
    centralMarkets = 0,
    firstMilitary = false,
    tradeEmpireMerchantmen = 0,
    tradeEmpireFavored = 0,
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
            ...createBuff(),
            discountVillage: buff.discountVillage,
            city: buff.city,
            overclock: buff.overclock,
            ultraboosts: buff.ultraboosts,
            central: buff.central,
            fertilizer: buff.fertilizer,
            firstFarm: buff.firstFarm,
        }    
    } else if (type === TowerType.Buccaneer) {
        return {
            ...createBuff(),
            discountVillage: buff.discountVillage,
            city: buff.city,
            tradeEmpireFavored: buff.tradeEmpireFavored,
            tradeEmpireMerchantmen: buff.tradeEmpireMerchantmen,
            centralMarkets: buff.centralMarkets,
            firstMilitary: buff.firstMilitary,
        }
    } else if (type === TowerType.Village) {
        return {
            ...createBuff(),
            discountVillage: buff.discountVillage,
            city: buff.city,
        }
    } else {
        return buff;
    }
}