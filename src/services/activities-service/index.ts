import activitiesRepository from "@/repositories/activities-repository";

async function listActivities(dayId: number) {
  return await activitiesRepository.listActivities(dayId);
}

const activitiesService = {
  listActivities
};

export default activitiesService;
