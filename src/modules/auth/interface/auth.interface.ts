import { ObjectID } from 'typeorm';

export interface ILoginEmail {
    email: string;
    password: string;
}

export interface ILoginName {
    name: string;
    password: string;
}

export interface ILoginSuccess {
    id: ObjectID;
    token: string;
}