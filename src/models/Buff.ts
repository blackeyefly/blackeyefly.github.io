import { over } from "lodash";

export class Buff {
    discountVillage: number;
    firstFarm: boolean;
    overclock: boolean;
    ultraboosts: number;

    constructor(
        discountVillage: number = 0,
        firstFarm: boolean = false,
        overclock: boolean = false,
        ultraboosts: number = 0,
    ) {
        this.discountVillage = discountVillage;
        this.firstFarm = firstFarm;
        this.overclock = overclock;
        this.ultraboosts = ultraboosts;
    }
}