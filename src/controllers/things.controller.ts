import { NextFunction, Request, Response } from 'express';
import {
    repoDelete,
    repoGet,
    repoGetAll,
    repoPatch,
    repoPost,
} from '../data/things.repository.js';
import { createHttpError, HTTPError } from '../interfaces/error.js';

export async function controllerGetAll(
    req: Request,
    resp: Response,
    next: NextFunction
) {
    console.log('HOLA SOY UN CONSOLE LOG');
    try {
        const things = await repoGetAll();
        resp.json({ things });
    } catch (error) {
        const httpError = HTTPError(
            503,
            'Service unavailable',
            (error as Error).message
        );
        next(httpError);
    }
}

export async function controllerGet(
    req: Request,
    resp: Response,
    next: NextFunction
) {
    try {
        const thing = await repoGet(req.params.id);
        resp.json({ thing });
    } catch (error) {
        next(createHttpError(error as Error));
    }
}

export async function controllerPost(
    req: Request,
    resp: Response,
    next: NextFunction
) {
    try {
        const thing = await repoPost(req.body);
        resp.json({ thing });
    } catch (error) {
        const httpError = HTTPError(
            503,
            'Service unavailable',
            (error as Error).message
        );
        next(httpError);
    }
}

export async function controllerPatch(
    req: Request,
    resp: Response,
    next: NextFunction
) {
    try {
        const thing = await repoPatch(req.params.id, req.body);
        resp.json({ thing });
    } catch (error) {
        next(createHttpError(error as Error));
    }
}

export async function controllerDelete(
    req: Request,
    resp: Response,
    next: NextFunction
) {
    try {
        await repoDelete(req.params.id);
        resp.json({});
    } catch (error) {
        next(createHttpError(error as Error));
    }
}
