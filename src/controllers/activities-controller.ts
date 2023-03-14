import { requestError } from "@/errors";
import { AuthenticatedRequest } from "@/middlewares";
import activitiesService from "@/services/activities-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function listActivities(req: AuthenticatedRequest, res: Response) {
  try{
    const dayId = Number(req.params.dayId);
    if(!dayId) {
      throw requestError(httpStatus.BAD_REQUEST, "Id invalid!");
    }
    const activities = await activitiesService.listActivities(dayId);
    return res.status(httpStatus.OK).send(activities);
  }catch {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
