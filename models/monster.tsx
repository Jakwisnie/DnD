import image from './campaign';

export class Bestiary{
    id?: number;
    name: string;
    challengeRating: number;
    monsterArmorType?: string;
    armorClass: number;
    hitPointDiceCount: number;
    hitPointModifier: number;
    averageHitPoints: number;
    passivePerception: number;
    strScore: number;
    dexScore: number;
    intScore: number;
    wisScore: number;
    chaScore: number;
    conScore: number;
    languageNoteOverride?: string;
    hasLair: boolean;
    lairDescription?: string;
    isLegendary: boolean;
    legendaryActionDescription?: string;
    isMythic: boolean;
    mythicActionDescription?: string;
    specialTraitsDescription?: string;
    actionDescription?: string;
    bonusActionDescription?: string;
    monsterDescription?: string;
    alignment: string;
    savingThrowProficiencies?: string[];
    damageAdjustments?: DamageTypeAdjustment[];
    conditionImmunities?: Condition[];
    environments?: Environment[];
    hitPointDiceType: number;
    monsterType?: MonsterType[];
    ownerID?: number;
    owner?: string;
    size: string;
    image?: Image;
}

export class MonsterType{
    id?: number;
    name: string;
    ownerID?: number;
}

export class Attribute{
    id?: number;
    name: string;
    ownerID?: number;
}
export class Environment{
    id?: number;
    name: string;
    ownerID?: number;
}
export class Alignment{
    id?: number;
    name: string;
}

export class Adjustment{
    id?: number;
    name: string;
}

export class Alignment{
    id?: number;
    name: string;
}