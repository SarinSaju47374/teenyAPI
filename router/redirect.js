 
import {Router} from "express";
import * as userController from "../controller/userController.js"

const router = Router();

router.route("/:id").get(userController.redirect);
 
export default router