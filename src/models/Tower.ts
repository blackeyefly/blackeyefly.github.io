import { Buff } from "./Buff";

export enum TowerType {
    Farm = "Farm",
}

export interface Tower {
    type: TowerType,
    upgrades: [number, number, number],
    buffs: Buff;
    cost: number,
    income: number,
    efficiency: number,
}