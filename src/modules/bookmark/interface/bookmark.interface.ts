import { ObjectID } from 'typeorm';

export enum StatusEnum {
    ACTIVE = 0,
    ARCHIVE = 1,
}

export interface IBookmark {
    readonly id: ObjectID;
    title: string;
    description: string;
    imageUrl: string;
    tags: string[];
    userId: ObjectID;
    favorite: boolean;
    status: StatusEnum;
    readonly createdAt: Date | string,
    readonly updatedAt: Date | string,
}