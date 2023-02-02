import { Buff, createBuff, fixBuffs } from "./Buff";
import Difficulty from "./Difficulty";
import MK from "./MK";
import { Tower, TowerType } from "./Tower";
import Utils from "./utils";

class Buccaneer extends Tower {
    type: TowerType;
    upgrades: [number, number, number];
    buffs: Buff;
    cost: number;
    income: number;
    efficiency: number;
    sellEfficiency: number;
    favoredSellEfficiency: number;

    protected incomePerRound = (mk: MK = MK.On) => {
        if (this.upgrades[2] < 3) {
            return 0;
        }

        var income = 0;
        if (this.upgrades[2] === 3) {
            income = 200;
        } else if (this.upgrades[2] === 4) {
            income = 500;
        } else if (this.upgrades[2] === 5) {
            income = 800;
        }

        income += mk === MK.On ? 20 : 0;
        income *= 1 + 0.1 * Math.min(this.buffs.centralMarkets, 10);
        income += 10 * this.buffs.tradeEmpireMerchantmen;
        income += 20 * this.buffs.tradeEmpireFavored;
        income *= this.buffs.city ? 1.15 : 1;
        return Math.floor(income);
    }

    constructor(
        upgrades: [number, number, number] = [0, 0, 0],
        mk: MK = MK.On,
        difficulty: Difficulty = Difficulty.Medium,
        buffs: Buff = createBuff()
    ) {
        super(upgrades, mk, difficulty, buffs, TowerType.Buccaneer);
        this.type = TowerType.Buccaneer;
        this.upgrades = upgrades;
        if (buffs.discountVillage < 0 || buffs.discountVillage > 3) {
            throw new Error("Invalid Number of Discounts");
        }
        this.buffs = fixBuffs(this.type, buffs);
        this.cost = Utils.cost(this.type, this.upgrades, mk, difficulty, buffs);
        this.income = this.incomePerRound(mk);
        this.efficiency = this.cost / this.income;
        this.favoredSellEfficiency = (this.cost * (1 - Math.min(0.8 + (mk ? 0.05 : 0), 0.95))) / this.income;
        this.sellEfficiency = this.upgrades[2] >= 4 ? this.favoredSellEfficiency : (this.cost * (1 - 0.7 - (mk ? 0.05 : 0))) / this.income;
    }
}

export default Buccaneer;