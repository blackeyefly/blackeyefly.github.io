import { Buff, createBuff, fixBuffs } from "./Buff";
import Difficulty from "./Difficulty";
import MK from "./MK";
import { Tower, TowerType } from "./Tower";
import Utils from "./utils";

class Village extends Tower {
    sacrificeValue: number = 0;
    farmsSacrificed: number = 0;

    protected incomePerRound(): number {
        if (this.upgrades[2] < 5) {
            return 0;
        } else {
            return this.sacrificeValue / 10;
        }
    }

    constructor(
        upgrades: [number, number, number] = [0, 0, 0],
        mk: MK = MK.On,
        difficulty: Difficulty = Difficulty.Medium,
        buffs: Buff = createBuff(),
        sacrificeValue: number = 0,
        farmsSacrificed: number = 0,
    ) {
        super(upgrades, mk, difficulty, buffs, TowerType.Village);
        this.sacrificeValue = sacrificeValue;
        this.farmsSacrificed = farmsSacrificed;
        this.income = this.incomePerRound();
        this.cost = Utils.cost(TowerType.Village, upgrades, mk, difficulty, buffs);
        if (this.upgrades[2] === 5) {
            this.cost += 5000 * this.farmsSacrificed;
        }
        this.buffs = fixBuffs(this.type, buffs);
    }
}

export default Village;