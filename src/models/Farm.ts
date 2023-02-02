import { Buff } from "./Buff";
import Difficulty from "./Difficulty";
import MK from "./MK";
import { Tower, TowerType } from "./Tower";
import Utils from "./utils";

class Farm implements Tower {
    type: TowerType;
    upgrades: [number, number, number];
    buffs: Buff;
    cost: number;
    income: number;
    efficiency: number;

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

        return value * (this.upgrades[1] >= 2 ? (mk ? 1.3 : 1.25) : 1);
    }

    private incomePerRound(mk: MK = MK.On) {
        return this.numberOfBananas() * this.bananaValue(mk) + (this.upgrades[2] === 5 ? 4000 : 0);
    }

    constructor(
        upgrades: [number, number, number] = [0, 0, 0],
        mk: MK = MK.On,
        difficulty: Difficulty = Difficulty.Medium,
        buffs: Buff = new Buff()
    ) {
        Utils.assertValidUpgrades(upgrades);
        if (buffs.discountVillage < 0 || buffs.discountVillage > 3) {
            throw new Error("Invalid Number of Discounts");
        }
        if (buffs.ultraboosts < 0 || buffs.discountVillage > 10) {
            throw new Error("Invalid Number of Ultraboosts");
        }

        this.type = TowerType.Farm;
        this.upgrades = upgrades;
        this.buffs = buffs;
        this.cost = Utils.cost(TowerType.Farm, upgrades, mk, difficulty, buffs);
        this.income = this.incomePerRound(mk);
        this.efficiency = this.cost / this.income;
    }

    showUpgrades() {
        return this.upgrades.join('-');
    }

    showBuffs() {
        return "";
    }
}

export default Farm;