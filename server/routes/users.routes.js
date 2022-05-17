//router
import { Router } from "express";

//controllers
import { signin, signup } from "../controllers/user.controllers.js";

//variables
const router = Router();

//rutas
router.post("/signin", signin);
router.post("/signup", signup);

//exports
export default router;
