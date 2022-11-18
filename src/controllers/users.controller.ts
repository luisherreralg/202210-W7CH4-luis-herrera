import { NextFunction, Request, Response } from 'express';
import { repoPost } from '../data/things.repository.js';
import { HTTPError } from '../interfaces/error.js';

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
