import { Buff, createBuff } from "./Buff";
import Difficulty from "./Difficulty";
import MK from "./MK";
import { Tower, TowerType } from "./Tower";

class Buccaneer extends Tower {
    protected incomePerRound(mk: MK = MK.On): number {
        if (this.upgrades[2] < 3) {
            return 0;
        }

        let income = 0;
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
        income += 10 * this.buffs.tradeEmpireFavored;
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
    }
}

export default Buccaneer;