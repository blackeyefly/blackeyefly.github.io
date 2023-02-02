import _ from 'lodash';

import { Buff, createBuff, fixBuffs } from './Buff';
import Difficulty from './Difficulty';
import MK from './MK';
import Utils, { TowerType } from './utils';

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

    protected abstract incomePerRound(mk: MK): number;

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
        this.buffs = fixBuffs(type, buffs);
        this.type = type;
        this.cost = Utils.cost(type, this.upgrades, mk, difficulty, buffs);
        this.income = this.incomePerRound(mk);
        this.efficiency = this.cost / this.income;

        var favoredSellPercentage = Math.min(
            0.8 +
            (mk === MK.On ? 0.05 : 0) +
            (mk === MK.On && [TowerType.Farm, TowerType.Village].includes(this.type) ? 0.02 : 0) +
            (this.type === TowerType.Farm && this.upgrades[2] >= 2 ? 0.1 : 0),
            0.95
        );

        var sellPercentage = (this.type === TowerType.Buccaneer && this.upgrades[2] >= 4) ? favoredSellPercentage :
            0.7 +
            (mk === MK.On ? 0.05 : 0) +
            (mk === MK.On && [TowerType.Farm, TowerType.Village].includes(this.type) ? 0.02 : 0) +
            (this.type === TowerType.Farm && this.upgrades[2] >= 2 ? 0.1 : 0)

        this.favoredSellValue = Math.ceil(this.cost * favoredSellPercentage);
        this.sellValue = Math.ceil(this.cost * sellPercentage);
        this.sellEfficiency = (this.cost - this.sellValue) / this.income;
        this.favoredSellEfficiency = (this.cost - this.favoredSellValue) / this.income;
    }
}

export { TowerType };
