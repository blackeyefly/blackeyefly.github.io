import { Buff, createBuff } from "./Buff";
import Difficulty from "./Difficulty";
import MK from "./MK";
import { Tower } from "./Tower";
import Utils, { TowerType } from "./utils";

class Farm extends Tower {
    private numberOfBananas(): number {
        let bananas: number;

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
        let value: number;

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

    protected incomePerRound(mk: MK = MK.On): number {
        return this.numberOfBananas() * this.bananaValue(mk) + (this.upgrades[2] === 5 ? 4000 : 0) * (this.buffs.city ? 1.15 : 1);
    }

    constructor(
        upgrades: [number, number, number] = [0, 0, 0],
        mk: MK = MK.On,
        difficulty: Difficulty = Difficulty.Medium,
        buffs: Buff = createBuff()
    ) {
        super(upgrades, mk, difficulty, buffs, TowerType.Farm);
        this.cost += this.buffs.overclock ? Utils.cost(TowerType.Engineer, [0, 4, 0], mk, difficulty, buffs) : 0;
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
        }
    }
}

export default Farm;