import express from "express";
import userController from "../controllers/user-controller.js";

const publicRouter = new express.Router();
publicRouter.post("/api/user/register", userController.register);

export { publicRouter };
