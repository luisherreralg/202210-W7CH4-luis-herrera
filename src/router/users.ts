import { Router } from 'express';
import { controllerPost } from '../controllers/users.controller.js';

export const usersRouter = Router();

usersRouter.post('/', controllerPost);
usersRouter.post('/:id', controllerPost);
