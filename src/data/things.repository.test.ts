import mongoose from 'mongoose';
import { dbConnect } from '../db/db.connect';
import { ProtoThing } from '../interfaces/thing';
import {
    repoDelete,
    repoGet,
    repoGetAll,
    repoPatch,
    repoPost,
    ThingModel,
} from './things.repository';

const mockData = [
    {
        title: 'test',
    },
    {
        title: 'test2',
    },
];

describe('Given the things.repository methods', () => {
    describe('When they are invoked', () => {
        let testIds: Array<string>;

        beforeAll(async () => {
            await dbConnect();
            await ThingModel.deleteMany();
            await ThingModel.insertMany(mockData);
            const data = await ThingModel.find();
            testIds = data.map((thing) => thing._id.toString());
        });

        afterAll(async () => {
            await mongoose.disconnect();
        });

        test('Then repoGetAll should return two mocked items', async () => {
            const getData = await repoGetAll();
            expect(getData).toHaveLength(2);
        });

        // test('If the repoGetAll fails, then it should return an error', () => {
        //  //
        //  })

        test('Then repoGet should return one mocked item', async () => {
            const getItem = await repoGet(testIds[0]);
            expect(getItem.title).toBe(mockData[0].title);
        });

        test('Then repoPost should create a new item', async () => {
            const mockedNewItem = {
                title: 'newItem',
            };

            const createNewItem = await repoPost(mockedNewItem);
            expect(createNewItem.title).toBe(mockedNewItem.title);
        });

        test('Then the repoPatch should update an existing thing', async () => {
            const mockedUpdatedItem = {
                title: 'updateItem',
            };
            const updatedItem = await repoPatch(testIds[0], mockedUpdatedItem);
            expect(updatedItem.title).toEqual(mockedUpdatedItem.title);
        });

        test('Then the repoDelete must return an undefined', async () => {
            const result = await repoDelete(testIds[0]);
            expect(result).toBeUndefined();
        });
    });
});
