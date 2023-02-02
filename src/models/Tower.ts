import _ from "lodash";
import { Buff, createBuff } from "./Buff";
import Difficulty from "./Difficulty";
import MK from "./MK";
import Utils, { TowerType } from "./utils";

export abstract class Tower {
    type!: TowerType;
    upgrades!: [number, number, number];
    buffs!: Buff;
    cost!: number;
    income!: number;
    efficiency!: number;
    sellValue!: number;
    favoredSellValue!: number;
    sellEfficiency!: number;
    favoredSellEfficiency!: number;

    protected abstract incomePerRound(): number;

    showUpgrades() {
        return this.upgrades.join('-');
    }

    showBuffs() {
        return Object
            .entries(this.buffs)
            .filter(x => x[1])
            .map(x => typeof x[1] === "number" ? _.startCase(x[0]) + " " + x[1] : _.startCase(x[0]))
            .sort()
            .join(", ");
    }

    constructor(
        upgrades: [number, number, number] = [0, 0, 0],
        mk: MK = MK.On,
        difficulty: Difficulty = Difficulty.Medium,
        buffs: Buff = createBuff(),
        type: TowerType,
    ) {
        Utils.assertValidUpgrades(upgrades);
        this.upgrades = upgrades;
        this.buffs = buffs;
        this.type = type;
        this.cost = Utils.cost(type, this.upgrades, mk, difficulty, buffs);
    }
}

export { TowerType };
