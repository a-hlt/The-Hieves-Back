import express from "express";
import * as controller from "../controllers/usersController.js";
import {DeleteByUuid, UpdateByUuid} from "../controllers/usersController.js";

const router = express.Router();

router.post("/create", controller.create);

router.post("/user", controller.GetUserByUuid);

router.put("/change", controller.UpdateByUuid);

router.delete("/delete", controller.DeleteByUuid);

export default router;