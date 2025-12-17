import express from "express";
import {
  authenticateToken,
  authorizePermission,
} from "../middleware/authorize.js";

var indexRouter = express.Router();

indexRouter.get("/public", (req, res) => {
  res.send("Anyone can read this!");
});

// routes/documents.js
indexRouter.get(
  "/",
  authenticateToken,
  authorizePermission("read:documents"),
  (req, res, next) => res.send("Read documents permitted!")
);
indexRouter.post(
  "/",
  authenticateToken,
  authorizePermission("write:documents"),
  (req, res, next) => res.send("Create documents permitted!")
);
indexRouter.delete(
  "/:id",
  authenticateToken,
  authorizePermission("delete:documents"),
  (req, res, next) => res.send("Delete documents permitted!")
);

export default indexRouter;
