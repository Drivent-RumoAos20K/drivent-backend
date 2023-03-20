import { isSubscribed, listActivities, signUpActivities } from "@/controllers/activities-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const activitiesRouter = Router();

activitiesRouter
  .all("/*", authenticateToken)
  .get("/:dayId", listActivities)
  .get("/", isSubscribed)
  .put("/:activitieId",signUpActivities );
export { activitiesRouter };
