export enum HintTypes {
	FavoredSellValue = 123, Efficiency, SellEfficiency, FavoredSellEfficiency, BuffCentralMarketBuccaneer, FirstOfType,
	OverclockUltraboost, MonkeyCity, AbilityCooldown, TargetTotals, DiscountVillages, MonkeyKnowledge
}
class IgnoreCaseMap<VALUE_TYPE> extends Map<string, VALUE_TYPE> {
	set = (key: string, value: VALUE_TYPE) => super.set(`${key}`.toLowerCase(), value);
	get = (key: string): VALUE_TYPE | undefined => super.get(`${key}`.toLowerCase());

	constructor(entries?: readonly (readonly [string, VALUE_TYPE])[] | null | undefined) {
		super();
		if (entries)
			entries.forEach((kvp) => this.set(kvp[0], kvp[1]));
	}
}
export class Hints {
	private constructor() { throw "we are static go away"; }
	static hintAliases = new IgnoreCaseMap<HintTypes>([
		["abilityEfficiency", HintTypes.Efficiency],
		["abilitySellEfficiency", HintTypes.SellEfficiency],
		["abilityFavoredSellEfficiency", HintTypes.FavoredSellEfficiency]
	]);
	static initialize() {
		Object.values(HintTypes).forEach(kVal => Hints.hintAliases.set(HintTypes[kVal as HintTypes], kVal as HintTypes));
	}

	static getHint(hintType: HintTypes): string {
		switch (hintType) {
			case HintTypes.Efficiency:
				return "Rounds required to generate income to the total cost of the tower";
			case HintTypes.FavoredSellEfficiency:
				return "Like sell effeciency but taking into account having a 004 buccaneer in range";
			case HintTypes.FavoredSellValue:
				return "Tower sale value with an 004 buccaneer in range";
			case HintTypes.SellEfficiency:
				return "Rounds required to generate income equal to the money one loses when selling the tower";
			case HintTypes.BuffCentralMarketBuccaneer:
				return "Per central market anywhere on the map buccaneers earn 10% more money capped at 100% more";
			case HintTypes.FirstOfType:
				return "When MK checked item has a discount related to being the first of that type doe to MK";
			case HintTypes.OverclockUltraboost:
				return "Applies the Overclock or Ultraboost effect, 10x UltraBoosts=Overclock so assumed same, does NOT assume stacking both";
			case HintTypes.MonkeyCity:
				return "Assumes tower is in range of a monkey city";
			case HintTypes.AbilityCooldown:
				return "How many seconds for the ability to be available again under normal conditions";
			case HintTypes.TargetTotals:
				return "Optional values to compare the total row to";
			case HintTypes.DiscountVillages:
				return "How many discount villages will the tower be in range of";
			case HintTypes.MonkeyKnowledge:
				return "Is monkey knowledge enabled? If not all MK related buffs are ignored. When checked assumes you have all relevant MK. It does not account for free dart/free glue gunner.";
			default:
				throw `unhandled hint type: ${hintType} use getPossibleHint`;
		}

	}

	static getPossibleHint(posValidHintType: string): string | undefined {
		let vals = Object.values(HintTypes).map(kVal => HintTypes[kVal as HintTypes]);
		//let validTypeStr = vals.find( str =>  posValidHintType.toLowerCase() === `${str}`.toLowerCase());
		let validType = Hints.hintAliases.get(posValidHintType.toLowerCase());
		console.log(`${(validType ? "Found hint" : "No hint")} for: ${posValidHintType}`);
		if (!validType)
			return undefined;
		return Hints.getHint(validType);
	}
}
Hints.initialize();
