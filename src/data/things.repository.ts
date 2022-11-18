import { model, Schema } from 'mongoose';
import { ProtoThing, Thing } from '../interfaces/thing.js';
import { id } from './data.js';

export const thingSchema = new Schema({
    title: String,
    id: String,
});

export const ThingModel = model('Thing', thingSchema, 'Things');

export async function repoGetAll() {
    const things = await ThingModel.find();
    return things;
}

export async function repoGet(id: id) {
    const result = await ThingModel.findById(id);
    if (!result) throw new Error('Not found id');
    return result as Thing;
}

export async function repoPost(data: ProtoThing) {
    const result = await ThingModel.create(data);
    return result as Thing;
}

export async function repoPatch(id: id, data: Partial<Thing>) {
    const result = await ThingModel.findByIdAndUpdate(id, data, {
        new: true,
    });
    if (!result) throw new Error('Not found id');
    return result as Thing;
}

export async function repoDelete(id: id) {
    const result = await ThingModel.findByIdAndDelete(id);
    if (result === null) throw new Error('Not found id');
    return;
}
