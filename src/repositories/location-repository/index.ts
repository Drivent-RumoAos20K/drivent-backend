import { prisma } from "@/config";

function findLocationActivities(dayId: number) {
  return prisma.location.findMany({
    include: {
      Activity: {
        where: {
          dayId
        },
        include: {
          _count: {
            select: {
              User: true
            }
          }
        }
      }
    }
  });
}

const locationRepository = {
  findLocationActivities
};

export default locationRepository;
