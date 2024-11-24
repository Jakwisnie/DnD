export class DamageDice{
    id?: number;
    diceType: string;
    damageType: string;
}

export class WeaponType{
    id?: number;
    name: string;
    ownerID?: number;
}

export class ArmorType{
    id?: number;
    name: string
    ownerID?: number;
}

export class MagicItemType{
    id?: number;
    name: string;
    ownerID?: number;
}

export class Item{
    id?: number;
    name: string;
    description?: string;
    weight: float;
    value: number;
    ownerID?: number;
    type: string;
    rarity?: string;
    requiresAtonement: boolean;
    atonementRequired?: string;
    itemType?: string;
    armorClass?: number;
    dexBonus?: number;
    strRequirement?: number;
    stealthDisadvantage?: boolean;
    isMartial?: boolean;
    isFinesse?: boolean;
    isVersatile?: boolean;
    damageDice?: DamageDice;
    special?: string;
    damageMulti?: number;
}
export class Rarity{
    id?: number;
    name: string;
}