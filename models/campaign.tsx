export class Image{
    id?: number;
    name: string;
    data: Uint8Array;
    ownerID: Optional[int] = None;
}


export class Session{
    id?: number;
    title: string;
    description?: string;
    campaign_id: number;
    notes?: Note[];
}

export class Campaign{
    id?: number;
    title: string;
    description?: string;
    sessions?: Session[]
    characters?: PlayerCharacter[]
    ownerID?: number;
}

export class Note{
    id?: number;
    title: string
    description?: string;
    session_id?: number;
    images?: number[];
    ownerID?: number;
}
