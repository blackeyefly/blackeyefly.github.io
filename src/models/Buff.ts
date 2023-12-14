import { TowerType } from "./utils";

export type Buff = {
    discountVillage: number;
    overclock: boolean;
    ultraboosts: number;
    firstFarm: boolean;
    firstMilitary: boolean;
    firstSpike: boolean;
    city: boolean;
    fertilizer: boolean;
    central: boolean;
    centralMarkets: number;
    tradeEmpireMerchantmen: number;
    tradeEmpireFavored: number;
    energizer: boolean;
    farmsInRange: number;
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
    firstSpike = false,
    tradeEmpireMerchantmen = 0,
    tradeEmpireFavored = 0,
    energizer = false,
    farmsInRange = 0,
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
        firstSpike,
        tradeEmpireMerchantmen,
        tradeEmpireFavored,
        energizer,
        farmsInRange,
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
            energizer: buff.energizer,
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
    } else if ([TowerType.Sub, TowerType.Ace, TowerType.Mortar, TowerType.Dartling].includes(type)) {
        return {
            ...createBuff(),
            discountVillage: buff.discountVillage,
            firstMilitary: buff.firstMilitary,
        };
    } else if (type === TowerType.Spike) {
        return {
            ...createBuff(),
            discountVillage: buff.discountVillage,
            firstSpike: buff.firstSpike,
        };
    } else if ([TowerType.Sniper, TowerType.Heli].includes(type)) {
        return {
            ...createBuff(),
            discountVillage: buff.discountVillage,
            city: buff.city,
            firstMilitary: buff.firstMilitary,
            energizer: buff.energizer,
        }
    } else if ([TowerType.Druid].includes(type)) {
        return {
            ...createBuff(),
            energizer: buff.energizer,
            city: buff.city,
            farmsInRange: buff.farmsInRange,
        }
    } else {
        return {
            ...createBuff(),
            discountVillage: buff.discountVillage,
        };
    }
}