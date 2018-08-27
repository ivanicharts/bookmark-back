import { ObjectID } from 'typeorm';

export enum StatusEnum {
    ACTIVE = 1,
    ARCHIVE = 0,
}

export class IBookmarkSHared {
    readonly _id: ObjectID;
    title: string;
    description?: string;
    imageUrl?: string;
    tags?: string[];
    userId: string;
    url: string;
    savedCount: number;
    readonly createdAt?: Date | string;
    readonly updatedAt?: Date | string;
}

export interface IBookmark extends IBookmarkSHared {
    favorite?: boolean;
    status: StatusEnum;
}

export enum GroupEnum {
    COPY = 'copy',
    UPDATE = 'update',
    READ = 'read',
    SHARED = 'shared',
    PRIVATE = 'private',
    ADD = 'add',
    RESOLVE = 'resolve',
    PRIVATE_SAVE = 'private/add'
}
