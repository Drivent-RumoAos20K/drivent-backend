import { prisma, redis } from "@/config";
import { Event } from "@prisma/client";

const cacheKey = "event";

async function findFirst() {
  const data: Event = JSON.parse(await redis.get(cacheKey));
  if (data !== null) {
    return data;
  } else {
    const newData = await prisma.event.findFirst();
    redis.set(cacheKey, JSON.stringify(newData));
    return newData;
  }
}

const eventRepository = {
  findFirst,
};

export default eventRepository;
