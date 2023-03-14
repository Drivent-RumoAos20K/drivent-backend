import { prisma } from "@/config";

async function listActivities(dayId: number) {
  return prisma.activity.findMany({
    where: {
      dayId
    },
    orderBy: {
      startAt: "asc"
    }, 
    include: {
      Location: {
        select: {
          name: true,
          id: true
        }
      },
      User: {
        select: {
          _count: true
        }
      }
    }
  });
}

const activitiesRepository = {
  listActivities
};

export default activitiesRepository;
