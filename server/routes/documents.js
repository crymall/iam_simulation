import express from 'express';
import {
  authenticateToken,
  authorizePermission,
} from "../middleware/authorize.js";

const documentsRouter = express.Router();

documentsRouter.get(
  "/",
  authenticateToken,
  authorizePermission("read:documents"),
  (req, res, next) => res.send("Read documents permitted!")
);
documentsRouter.post(
  "/",
  authenticateToken,
  authorizePermission("write:documents"),
  (req, res, next) => res.send("Create documents permitted!")
);
documentsRouter.delete(
  "/:id",
  authenticateToken,
  authorizePermission("delete:documents"),
  (req, res, next) => res.send("Delete documents permitted!")
);

export default documentsRouter;