import { Router } from 'express';
import {
    controllerDelete,
    controllerGet,
    controllerGetAll,
    controllerPatch,
    controllerPost,
} from '../controllers/things.js';

export const thingRouter = Router();

// const controller = new ThingController(new ThingFileData());

thingRouter.get('/', controllerGetAll);
thingRouter.get('/:id', controllerGet);
thingRouter.post('/', controllerPost);
thingRouter.patch('/:id', controllerPatch);
thingRouter.delete('/:id', controllerDelete);
