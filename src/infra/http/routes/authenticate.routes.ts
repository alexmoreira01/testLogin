import { Router } from "express";

import { AuthenticateUserController } from "../controllers/accounts/authenticate-user-controller";
import { RefreshTokenController } from "../controllers/accounts/refresh-token-controller";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post("/sessions", authenticateUserController.handle);
authenticateRoutes.post("/refresh-token", refreshTokenController.handle);

export { authenticateRoutes };