import { NextFunction, Request, Response } from 'express';
import * as repository from '../data/things.repository';
import {
    controllerDelete,
    controllerGet,
    controllerGetAll,
    controllerPatch,
    controllerPost,
} from './things.controller';
jest.mock('../data/things.repository');

const mockData = [
    {
        id: '0',
        title: 'test',
    },
    {
        id: '1',
        title: 'test2',
    },
];

const mockError = {
    message: undefined,
    statusCode: 503,
    statusMessage: 'Service unavailable',
};

describe('Given the things controller methods', () => {
    describe('When they are invoked', () => {
        (repository.repoGetAll as jest.Mock).mockResolvedValue(mockData);
        (repository.repoGet as jest.Mock).mockResolvedValue(mockData[0]);
        (repository.repoPost as jest.Mock).mockResolvedValue(mockData[0]);
        (repository.repoPatch as jest.Mock).mockResolvedValue(mockData);
        (repository.repoDelete as jest.Mock).mockResolvedValue({});

        const req: Partial<Request> = {};
        const resp: Partial<Response> = {
            json: jest.fn(),
        };
        const next: NextFunction = jest.fn();

        test('Then controllerGetAll should return a response with an array of mockData', async () => {
            await controllerGetAll(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.json).toHaveBeenCalledWith({ things: mockData });
        });

        test('Then when controllerGetAll cant get a response, it should return an error', async () => {
            (repository.repoGetAll as jest.Mock).mockRejectedValue('Error');
            await controllerGetAll(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalledWith(mockError);
        });

        test('Then controllerGet should return a response with an object of mockData', async () => {
            req.params = { id: '0' };
            await controllerGet(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.json).toHaveBeenCalledWith({ thing: mockData[0] });
        });

        test('Then if the controllerGet cant get a response, it should return an error', async () => {
            (repository.repoGet as jest.Mock).mockRejectedValue('Error');
            await controllerGet(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalledWith(mockError);
        });

        test('Then controllerPost should return a response with an object of mockData', async () => {
            req.body = mockData[0];
            await controllerPost(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.json).toHaveBeenCalledWith({ thing: mockData[0] });
        });

        test('Then if the controllerPost cant get a response, it should return an error', async () => {
            (repository.repoPost as jest.Mock).mockRejectedValue('Error');
            await controllerPost(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalledWith(mockError);
        });

        test('Then controllerPatch should return a response with an array of mockData', async () => {
            req.body = mockData[0];
            req.params = { id: '0' };
            await controllerPatch(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.json).toHaveBeenCalledWith({ things: mockData });
        });

        test('Then if the controllerPatch cant get a response, it should return an error', async () => {
            (repository.repoPost as jest.Mock).mockRejectedValue('Error');
            await controllerPatch(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalledWith(mockError);
        });

        test('Then controllerDelete should return a response with an empty object', async () => {
            req.params = { id: '0' };
            await controllerDelete(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.json).toHaveBeenCalledWith({});
        });

        test('Then if the controllerDelete cant get a response, it should return an error', async () => {
            (repository.repoDelete as jest.Mock).mockRejectedValue('Error');
            await controllerDelete(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalledWith(mockError);
        });
    });
});
