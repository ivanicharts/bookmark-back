import { ObjectID } from 'typeorm';

export interface Bookmark {
    readonly id: ObjectID;
    title: string;
    description: string;
    imageUrl: string;
    tags: string[];
    userId: ObjectID;
    priority: number;
    wasRead: boolean;
    readonly createdAt: Date | string,
    readonly updatedAt: Date | string,
}