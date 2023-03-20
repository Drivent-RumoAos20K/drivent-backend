import { alreadyRegisteredError, noVacancyError, schedulesConflictError } from "@/errors/activities-error";
import activitiesRepository from "@/repositories/activities-repository";

import locationRepository from "@/repositories/location-repository";
import { func } from "joi";


async function listActivities(dayId: number) {
  return await locationRepository.findLocationActivities(dayId);
}

async function signUp(userId: number, activitieId: number) {

  const activity = await activitiesRepository.findActivityById(activitieId)

  let usuarioJaRegistrado = activity.User.some((participante) => {
    return participante.id === userId
  })

  if (usuarioJaRegistrado === true) {
    throw alreadyRegisteredError()
  }

  const { checkDate, userActivity } = await activitiesRepository.activityConflicts(userId, activitieId)
  let start1 = checkDate.startAt;
  let end1 = checkDate.endAt

  for (let i = 0; i < userActivity.Activities.length; i++) {
    if (start1 < userActivity.Activities[i].endAt && end1 > userActivity.Activities[i].startAt) {
      throw schedulesConflictError()
    }
  }

  if (activity.User.length < activity.capacity) {
    return await activitiesRepository.createActivities(userId, activitieId);
  }
  throw noVacancyError()
}

async function isSubscribed(userId: number) {
  const activitiesUser = await activitiesRepository.isSubscribed(userId)
  return activitiesUser.map(activitie => activitie.id)

}



const activitiesService = {
  listActivities,
  signUp,
  isSubscribed
};

export default activitiesService;
