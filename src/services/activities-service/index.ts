import locationRepository from "@/repositories/location-repository";

async function listActivities(dayId: number) {
  // const a = await activitiesRepository.listActivities(dayId);
  return await locationRepository.findLocationActivities(dayId);
}

const activitiesService = {
  listActivities
};

export default activitiesService;
