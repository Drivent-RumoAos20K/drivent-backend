import { alreadyRegisteredError, noVacancyError, schedulesConflictError } from "@/errors/activities-error";
import activitiesRepository from "@/repositories/activities-repository";

import locationRepository from "@/repositories/location-repository";

async function listActivities(dayId: number) {
  return await locationRepository.findLocationActivities(dayId);
}

async function signUp(userId: number, activitieId: number) {
  const activity = await activitiesRepository.findActivityById(activitieId);

  const usuarioJaRegistrado = activity.User.some((participante) => {
    return participante.id === userId;
  });

  if (usuarioJaRegistrado === true) {
    throw alreadyRegisteredError();
  }

  const { checkDate, userActivity } = await activitiesRepository.activityConflicts(userId, activitieId);

  for (let i = 0; i < userActivity.Activities.length; i++) {
    if (checkDate === userActivity.Activities[i]) {
      throw schedulesConflictError();
    }
  }

  if (activity.User.length < activity.capacity) {
    return await activitiesRepository.createActivities(userId, activitieId);
  }
  throw noVacancyError();
}

const activitiesService = {
  listActivities,
  signUp,
};

export default activitiesService;
