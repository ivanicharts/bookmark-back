import { ObjectID } from 'typeorm';

export enum StatusEnum {
    ACTIVE = 0,
    ARCHIVE = 1,
}

export class IBookmarkSHared {
    readonly id: ObjectID;
    title: string;
    description?: string;
    imageUrl?: string;
    tags?: string[];
    userId: ObjectID;
    url: string;
    readonly createdAt?: Date | string;
    readonly updatedAt?: Date | string;
}

export interface IBookmark extends IBookmarkSHared {
    favorite?: boolean;
    status: StatusEnum;
}

export enum GroupEnum {
    SHARED = 'shared',
    PRIVATE = 'private',
    ADD = 'add',
}
