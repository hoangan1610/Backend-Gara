import express from 'express';
import { TaskController } from '../controllers';

const taskRouter = express.Router();

let taskAPIRoute = (app) => {
    taskRouter.post("/", new TaskController().create);
    taskRouter.put("/:id", new TaskController().update);
    taskRouter.get("/:id", new TaskController().getOne); 
    taskRouter.get("/", new TaskController().getAll);
    taskRouter.delete("/:id", new TaskController().delete);

    return app.use("/api/v1/tasks", taskRouter);
};

export default taskAPIRoute;
