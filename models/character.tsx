import Note from './campaign';
import Spell from './spell';
import Item from './item';

export class Feat{
    id?: number;
    name: string;
    description?: string;
    requirements?: string;
    ownerID?: number;
}


export class Feature{
    id?: number;
    name: string;
    description?: string;
    levelReq: number;
    ownerID?: number;
}


export class PlayerClass{
    id?: number;
    name: string;
    description?:string;
    features?: Feature[];
    subClasses?: PlayerSubClass[];
    ownerID?: number;
}

export class PlayerSubClass {
    id?: number;
    name: string;
    description?: string;
    mainClass: string;
    features?: Feature[];
    ownerID?: number;
}

export class PlayerOwnedClass {
    id?: number;
    name: string;
    mainClass?: string;
    level: number;
}
export class SubSpecies{
    id?: number;
    name: string;
    description?: string;
    speed: number;
    size: string;
    mainSpeciesID: number;
    mainSpecies: string;
    feats?: Feat[];
    ownerID?: number;
}

export class Species{
    id: number;
    name: string;
    description?: string;
    speed: number;
    size: string;
    feats?: Feat[];
    subSpecies?: SubSpecies[];
    ownerID: number;
}

export class PlayerSpecies{
    id: number;
    name: string;
    description: string;
    speed: number;
    size: string;
    mainSpecies?: string;
    feats?: Feat[];
}


export class PlayerCharacter {
  id?: number;
  name: string;
  description?: string;
  armorClass: number;
  strScore: number;
  dexScore: number;
  intScore: number;
  wisScore: number;
  chaScore: number;
  conScore: number;
  alignment: string;
  spellbook?: Spell[];
  playerClasses?: PlayerOwnedClass[];
  feats?: Feat[];
  campaign?: string;
  inventory?: Item[];
  background: string;
  money: number;
  playerSpecies?: PlayerSpecies[];
  imageID?: number;
  image: string;
  ownerID?: number;
  owner: string;
  shared_notes?: Note[]
}

export class Background{
    id?: number;
    name: string;
    description?: string;
    feats?: Feat[];
    ownerID?: number
}
