export class School{
    id?: number;
    name: string;
    description: string;
    spells?: Spell[];
}

export class Spell{
    id?: number;
    name: string;
    description?:string;
    level: number;
    castingTime: string;
    duration: string;
    components: string;
    atHigherLevels?: string;
    school: string;
    ownerID?: number;
}
