import _, { min } from "lodash";
import { Buff, createBuff, fixBuffs } from "./Buff";
import Difficulty from "./Difficulty";
import MK from "./MK";
import { Tower } from "./Tower";
import Utils, { TowerType } from "./utils";

class Farm extends Tower {
    type: TowerType;
    upgrades: [number, number, number];
    buffs: Buff;
    cost: number;
    income: number;
    efficiency: number;
    sellValue: number;
    favoredSellValue: number;
    sellEfficiency: number;
    favoredSellEfficiency: number;

    private numberOfBananas(): number {
        var bananas: number;

        if (this.upgrades[0] >= 4) {
            bananas = 5;
        } else if (this.upgrades[2] >= 3) {
            bananas = 16 + 2 * this.upgrades[0]
        } else if (this.upgrades[0] === 3) {
            bananas = 16;
        } else {
            bananas = 4 + 2 * this.upgrades[0];
        }

        bananas = Math.ceil(bananas * (1 + (this.buffs.overclock ? 2/3 : 0) + (this.buffs.ultraboosts * 1/15)));

        return bananas;
    }

    private bananaValue(mk: MK = MK.Off): number {
        var value: number;

        if (this.upgrades[0] === 5) {
            value = 1200;
        } else if (this.upgrades[0] === 4) {
            value = 300;
        } else if (this.upgrades[2] >= 4) {
            value = 70;
        } else {
            value = 20;
        }

        if (this.buffs.central && this.upgrades[0] >= 4) {
            value *= 1.25;
        }

        if (this.buffs.fertilizer && this.upgrades[1] < 3 && this.upgrades[2] < 3) {
            value *= 1.25;
        }

        return Math.floor(value * (this.upgrades[1] >= 2 ? (mk ? 1.3 : 1.25) : 1) * (this.buffs.city ? 1.15 : 1));
    }

    protected incomePerRound(mk: MK = MK.On) {
        return this.numberOfBananas() * this.bananaValue(mk) + (this.upgrades[2] === 5 ? 4000 : 0) * (this.buffs.city ? 1.15 : 1);
    }

    constructor(
        upgrades: [number, number, number] = [0, 0, 0],
        mk: MK = MK.On,
        difficulty: Difficulty = Difficulty.Medium,
        buffs: Buff = createBuff()
    ) {
        super(upgrades, mk, difficulty, buffs, TowerType.Farm);
        if (buffs.discountVillage < 0 || buffs.discountVillage > 3) {
            throw new Error("Invalid Number of Discounts");
        }
        if (buffs.ultraboosts < 0 || buffs.discountVillage > 10) {
            throw new Error("Invalid Number of Ultraboosts");
        }
        this.type = TowerType.Farm;
        this.upgrades = upgrades;
        this.buffs = fixBuffs(this.type, buffs);
        if (this.upgrades[1] > 2 || this.upgrades[2] > 2) {
            this.buffs.fertilizer = false;
        }
        if (this.upgrades[0] < 4) {
            this.buffs.central = false;
        }
        this.cost = Utils.cost(TowerType.Farm, upgrades, mk, difficulty, buffs) +
            (this.buffs.overclock ? Utils.cost(TowerType.Engineer, [0, 4, 0], mk, difficulty, buffs) : 0);
        this.income = this.incomePerRound(mk);
        this.efficiency = this.cost / this.income;
        if (this.buffs.overclock) {
            this.sellValue = Math.round(Utils.cost(
                    TowerType.Farm,
                    upgrades,
                    mk,
                    difficulty,
                    buffs
                ) * (0.75 + (this.upgrades[2] >= 2 ? 0.1 : 0) - (mk ? 0.02 : 0))) +
                Math.round(Utils.cost(
                    TowerType.Engineer,
                    [0, 4, 0],
                    mk,
                    difficulty,
                    buffs
                ) * 0.75)
            this.favoredSellValue = Math.round(Utils.cost(
                    TowerType.Farm,
                    upgrades,
                    mk,
                    difficulty,
                    buffs
                ) * Math.min(0.85 + (this.upgrades[2] >= 2 ? 0.1 : 0) + (mk ? 0.02 : 0), 0.95)) +
                Math.round(Utils.cost(
                    TowerType.Engineer,
                    [0, 4, 0],
                    mk,
                    difficulty,
                    buffs
                ) * 0.85)

            this.sellEfficiency = (
                Utils.cost(
                    TowerType.Farm,
                    upgrades,
                    mk,
                    difficulty,
                    buffs
                ) * (1 - 0.75 - (this.upgrades[2] >= 2 ? 0.1 : 0) - (mk ? 0.02 : 0)) +
                Utils.cost(
                    TowerType.Engineer,
                    [0, 4, 0],
                    mk,
                    difficulty,
                    buffs
                ) * (1 - 0.75)
            ) / this.income;
            this.favoredSellEfficiency = (
                Utils.cost(
                    TowerType.Farm,
                    upgrades,
                    mk,
                    difficulty,
                    buffs
                ) * (1 - Math.min(0.85 + (this.upgrades[2] >= 2 ? 0.1 : 0) + (mk ? 0.02 : 0), 0.95)) +
                Utils.cost(
                    TowerType.Engineer,
                    [0, 4, 0],
                    mk,
                    difficulty,
                    buffs
                ) * (1 - 0.85 - (this.upgrades[2] >= 2 ? 0.1 : 0))
            ) / this.income;
        } else {
            this.sellValue = Math.round(this.cost * (0.7 + (this.upgrades[2] >= 2 ? 0.1 : 0) + (mk ? 0.07 : 0)))
            this.favoredSellValue = Math.round(this.cost * Math.min(0.8 + (this.upgrades[2] >= 2 ? 0.1 : 0) + (mk ? 0.07 : 0), 0.95));
            this.sellEfficiency = (this.cost - this.sellValue) / this.income;
            this.favoredSellEfficiency = (this.cost - this.favoredSellValue) / this.income;    
        }
    }
}

export default Farm;