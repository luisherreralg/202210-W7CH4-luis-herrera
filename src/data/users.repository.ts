import { model, Schema } from 'mongoose';
import { ProtoUser, User } from '../interfaces/user.js';

export const thingSchema = new Schema({
    id: String,
    userName: String,
    password: String,
    email: String,
    role: String,
});

export const UserModel = model('User', thingSchema, 'Users');

export async function repoPost(data: ProtoUser) {
    const result = await UserModel.create(data);
    return result as User;
}
