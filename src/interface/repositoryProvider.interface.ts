import { Connection } from 'typeorm';

export interface IRepositoryProvider {
    provide: string;
    useFactory: (connection: Connection) => any;
    inject: (typeof Connection)[];
}