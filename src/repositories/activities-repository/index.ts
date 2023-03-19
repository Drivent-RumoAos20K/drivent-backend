import { prisma } from "@/config";
import { Console } from "console";

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
      _count: {
        select: {
          User: true
        }
      }
    }
  });
}

async function createActivities(userId: number, activitieId: number) {
  await prisma.activity.update({
    where: { id: activitieId },
    data: {
      User: {
        connect: { id: userId }
      }
    }
  })
}

async function findActivityById(activitieId: number) {
  return await prisma.activity.findUnique({
    where: { id: activitieId },
    select: {
      capacity: true,
      User: {
        select: {
          id: true
        }
      }
    },
  })
}

async function activityConflicts(userId: number, activitieId: number) {
  const checkDate = await prisma.activity.findUnique({
    where: { id: activitieId },
    select: {
      startAt: true,
    },
  })

  const userActivity = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      Activities: {
        select: {
          startAt: true,
        }
      }

    },
  })
  return { checkDate, userActivity } 
}

const activitiesRepository = {
  listActivities,
  createActivities,
  findActivityById,
  activityConflicts
};

export default activitiesRepository;
