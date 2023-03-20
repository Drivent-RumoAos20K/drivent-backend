import { requestError } from "@/errors";
import { AuthenticatedRequest } from "@/middlewares";
import activitiesService from "@/services/activities-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function listActivities(req: AuthenticatedRequest, res: Response) {
  try {
    const dayId = Number(req.params.dayId);
    if (!dayId) {
      throw requestError(httpStatus.BAD_REQUEST, "Id invalid!");
    }
    const activities = await activitiesService.listActivities(dayId);
    return res.status(httpStatus.OK).send(activities);
  } catch {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function signUpActivities(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const activitieId = Number(req.params.activitieId);

    const activitie = await activitiesService.signUp(userId, activitieId)

    return res.status(httpStatus.OK).send(activitie);
  } catch (err) {
    if (err.name === "noVacancyError") {
      return res.status(httpStatus.CONFLICT).send(err);
    }
    if (err.name === "alreadyRegisteredError") {
      return res.status(httpStatus.CONFLICT).send(err);
    }
    if (err.name === "schedulesConflictError") {
      return res.status(httpStatus.CONFLICT).send(err);
    }
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function isSubscribed(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    

    const subscribedActivities = await activitiesService.isSubscribed(userId)
    return res.status(httpStatus.OK).send(subscribedActivities);
  } catch (err) {
    console.log(err)
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}