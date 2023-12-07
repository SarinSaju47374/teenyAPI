import * as userController from "../controller/userController.js"
import { userAuth } from "../middelleware/authMiddleware.js";
import { verify } from "../middelleware/verifyUser.js";

import {Router} from "express";
const router = Router();

router.route("/login").post(userController.login);
router.route("/reset").post(userController.reset);
router.route("/check").get(verify,userController.check); 

//Protected routes
router.route("/urls").get(userAuth,userController.urls);
router.route("/shorten-url").post(userAuth,userController.shortenUrl);

export default router