import { ObjectID } from 'mongodb';

export interface BookObj {
    _id?: ObjectID;
    title?: string;
    titleLength?: number;
    description: string;
    code3: string;
    createdAt: Date;
    updatedAt: Date;
}
