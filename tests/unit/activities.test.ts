import locationRepository from "@/repositories/location-repository";
import activitiesService from "@/services/activities-service";
import { jest } from "@jest/globals";

jest.mock("@/repositories/location-repository");

describe("listActivities", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should return the activities for a given day", async () => {
    const dayId = 1;
    const mockActivities = [
      {
        id: 1,
        name: "Activity 1",
        startAt: new Date("2023-03-24T12:00:00"),
        endAt: new Date("2023-03-24T13:00:00"),
        capacity: 2,
        locationId: 1
      },
      {
        id: 2,
        name: "Activity 2",
        startAt: new Date("2023-03-24T13:00:00"),
        endAt: new Date("2023-03-24T14:00:00"),
        capacity: 12,
        locationId: 1
      }
    ];

    (locationRepository.findLocationActivities as jest.Mock).mockResolvedValueOnce(mockActivities);

    const result = await activitiesService.listActivities(dayId);

    expect(locationRepository.findLocationActivities).toHaveBeenCalledWith(dayId);
    expect(result).toEqual(mockActivities);
  });

  it("Should throw an error if locationRepository throws an error", async () => {
    const dayId = 1;

    (locationRepository.findLocationActivities as jest.Mock).mockRejectedValueOnce(new Error());
    await expect(activitiesService.listActivities(dayId)).rejects.toThrow();
  });
});
