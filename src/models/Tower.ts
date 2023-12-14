import _ from 'lodash';

import { Buff, createBuff, fixBuffs } from './Buff';
import Difficulty from './Difficulty';
import MK from './MK';
import Utils, { TowerType } from './utils';

export class Tower {
    type!: TowerType;
    upgrades!: [number, number, number];
    buffs!: Buff;
    cost!: number;
    income!: number;
    isCounted!: boolean;
    efficiency!: number;
    sellValue!: number;
    favoredSellValue!: number;
    sellEfficiency!: number;
    favoredSellEfficiency!: number;
    abilityIncome!: number;
    abilityCooldown!: number;
    incomePerMinute!: number;
    abilityEfficiency!: number;
    abilitySellEfficiency!: number;
    abilityFavoredSellEfficiency!: number;

    // Monkeyopolis specific
    sacrificeValue = 0;
    farmsSacrificed = 0;

    showUpgrades() {
        return this.upgrades.join('-');
    }
    getTiers() : number {
        return this.upgrades[0] + this.upgrades[1] + this.upgrades[2] + 1;
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
        type: TowerType,
        upgrades: [number, number, number] = [0, 0, 0],
        mk: MK = MK.On,
        difficulty: Difficulty = Difficulty.Medium,
        buffs: Buff = createBuff(),
        sacrificeValue = 0,
        farmsSacrificed = 0,
    ) {
        Utils.assertValidUpgrades(upgrades);
        this.upgrades = upgrades;
        this.buffs = fixBuffs(type, buffs);
        this.type = type;
        this.isCounted = true;
        this.sacrificeValue = sacrificeValue;
        this.farmsSacrificed = farmsSacrificed;
        this.cost = Utils.cost(this, mk, difficulty);
        this.income = Utils.incomePerRound(this, mk);
        this.efficiency = this.cost / this.income;
        this.abilityIncome = Utils.incomePerAbilty(this, mk);
        this.abilityCooldown = Utils.abilityCooldown(this, mk);
        this.incomePerMinute = this.abilityIncome / (this.abilityCooldown / 60);
        this.abilityEfficiency = this.cost / this.abilityIncome;

        const favoredSellPercentage = Math.min(
            0.8 +
            (mk === MK.On ? 0.05 : 0) +
            (mk === MK.On && [TowerType.Farm, TowerType.Village].includes(this.type) ? 0.02 : 0) +
            (this.type === TowerType.Farm && this.upgrades[2] >= 2 ? 0.1 : 0),
            0.95
        );

        const sellPercentage = (this.type === TowerType.Buccaneer && this.upgrades[2] >= 4) ? favoredSellPercentage :
            0.7 +
            (mk === MK.On ? 0.05 : 0) +
            (mk === MK.On && [TowerType.Farm, TowerType.Village].includes(this.type) ? 0.02 : 0) +
            (this.type === TowerType.Farm && this.upgrades[2] >= 2 ? 0.1 : 0)

        this.favoredSellValue = Math.ceil(this.cost * favoredSellPercentage);
        this.sellValue = Math.ceil(this.cost * sellPercentage);
        this.sellEfficiency = (this.cost - this.sellValue) / this.income;
        this.favoredSellEfficiency = (this.cost - this.favoredSellValue) / this.income;
        this.abilitySellEfficiency = (this.cost - this.sellValue) / this.abilityIncome;
        this.abilityFavoredSellEfficiency = (this.cost - this.favoredSellValue) / this.abilityIncome;
    }
}

export { TowerType };
