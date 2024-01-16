import express from "express";
import todoController from "../controllers/todo-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);

// todo api
userRouter.post("/api/todo", todoController.create);
userRouter.get("/api/todos/:userId", todoController.list);
userRouter.patch("/api/todo", todoController.update);
userRouter.delete("/api/todo", todoController.remove);

export { userRouter };
