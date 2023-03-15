import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: "Driven.t",
        logoImageUrl: "https://files.driveneducation.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, "days").toDate(),
      },
    });
  }

  // await prisma.ticketType.createMany({
  //   data: [
  //     {
  //       name: "Ticket Online",
  //       price: 100,
  //       isRemote: true,
  //       includesHotel: false,
  //       createdAt: dayjs().toDate(),
  //       updatedAt: dayjs().toDate(),
  //     },
  //     {
  //       name: "Ticket Presencial",
  //       price: 250,
  //       isRemote: false,
  //       includesHotel: false,
  //       createdAt: dayjs().toDate(),
  //       updatedAt: dayjs().toDate(),
  //     },
  //     {
  //       name: "Ticket Presencial + Hotel",
  //       price: 600,
  //       isRemote: false,
  //       includesHotel: true,
  //       createdAt: dayjs().toDate(),
  //       updatedAt: dayjs().toDate(),
  //     },
  //   ],
  // });

  // await prisma.enrollment.create({
  //   data: {
  //     id: 1,
  //     name: "teste",
  //     cpf: "12345678912",
  //     birthday: dayjs().toDate(),
  //     phone: "44999442233",
  //     userId: 1,
  //     createdAt: dayjs().toDate(),
  //     updatedAt: dayjs().toDate(),
  //   },
  // });

  // await prisma.address.create({
  //   data: {
  //     id: 1,
  //     cep: "99999999",
  //     street: "Teste",
  //     city: "Teste",
  //     state: "AC",
  //     number: "111",
  //     neighborhood: "Teste",
  //     addressDetail: "Teste",
  //     enrollmentId: 1,
  //     createdAt: dayjs().toDate(),
  //     updatedAt: dayjs().toDate(),
  //   },
  // });

  // await prisma.hotel.createMany({
  //   data: [
  //     {
  //       name: "Driven Resort",
  //       image: "https://media-cdn.tripadvisor.com/media/photo-s/22/25/ce/ea/kingsford-hotel-manila.jpg"
  //     },
  //     {
  //       name: "Driven Palace",
  //       image: "https://cdn.britannica.com/94/148994-050-3EFF8DCB/Buckingham-Palace-Queen-Victoria-Memorial-London-statue.jpg"
  //     },
  //     {
  //       name: "Driven World",
  //       image: "https://www.rwlasvegas.com/wp-content/uploads/2021/10/exterior-2.jpg"
  //     },
  //   ]
  // });

  // await prisma.room.createMany({
  //   data: [
  //     {
  //       hotelId: 1,
  //       name: "01",
  //       capacity: 3
  //     },
  //     {
  //       hotelId: 1,
  //       name: "02",
  //       capacity: 2
  //     },
  //     {
  //       hotelId: 1,
  //       name: "03",
  //       capacity: 1
  //     },
  //     {
  //       hotelId: 2,
  //       name: "01",
  //       capacity: 3
  //     },
  //     {
  //       hotelId: 2,
  //       name: "02",
  //       capacity: 2
  //     },
  //     {
  //       hotelId: 2,
  //       name: "03",
  //       capacity: 1
  //     },
  //     {
  //       hotelId: 3,
  //       name: "01",
  //       capacity: 3
  //     },
  //     {
  //       hotelId: 3,
  //       name: "02",
  //       capacity: 2
  //     },
  //     {
  //       hotelId: 3,
  //       name: "03",
  //       capacity: 1
  //     },
  //   ]
  // });

  await prisma.daysActivities.createMany({
    data: [
      {
        data: new Date("2023-03-24T03:24:00")
      },
      {
        data: new Date("2023-03-25T03:24:00")
      },
      {
        data: new Date("2023-03-24T03:24:00")
      }
    ]
  });

  await prisma.location.createMany({
    data: [{
      name: "Auditório Principal"
    },
    {
      name: "Auditório Lateral"
    },
    {
      name: "Sala de Workshop"
    }
    ]
  });

  await prisma.activity.createMany({
    data: [
      {
        name: "Campeonato de Devs - Lolzinho",
        locationId: 1,
        startAt: new Date("2023-03-24T12:00:00"),
        endAt: new Date("2023-03-24T13:00:00"),
        capacity: 2,
        dayId: 1
      },
      {
        name: "Palestra NodeJs",
        locationId: 1,
        startAt: new Date("2023-03-24T13:00:00"),
        endAt: new Date("2023-03-24T14:00:00"),
        capacity: 10,
        dayId: 1
      },
      {
        name: "Aula para convencer que back é melhor que front",
        locationId: 2,
        startAt: new Date("2023-03-24T13:00:00"),
        endAt: new Date("2023-03-24T15:00:00"),
        capacity: 25,
        dayId: 1
      },
      {
        name: "Hackathon Parrots",
        locationId: 3,
        startAt: new Date("2023-03-24T13:00:00"),
        endAt: new Date("2023-03-24T14:00:00"),
        capacity: 25,
        dayId: 1
      },
      {
        name: "Como conseguir um emprego?",
        locationId: 3,
        startAt: new Date("2023-03-24T14:00:00"),
        endAt: new Date("2023-03-24T15:00:00"),
        capacity: 25,
        dayId: 1
      },
      {
        name: "Palestra do Mr Pink.",
        locationId: 1,
        startAt: new Date("2023-03-25T15:00:00"),
        endAt: new Date("2023-03-25T18:00:00"),
        capacity: 25,
        dayId: 2
      },
      {
        name: "Criando uma aplicação sem bibliotecas",
        locationId: 2,
        startAt: new Date("2023-03-25T12:00:00"),
        endAt: new Date("2023-03-25T13:00:00"),
        capacity: 25,
        dayId: 2
      },
      {
        name: "Talk com empresas parceiras",
        locationId: 2,
        startAt: new Date("2023-03-25T13:00:00"),
        endAt: new Date("2023-03-25T14:00:00"),
        capacity: 100,
        dayId: 2
      },
      {
        name: "Palestra sobre algoritimos e estruturas de dados",
        locationId: 2,
        startAt: new Date("2023-03-25T14:00:00"),
        endAt: new Date("2023-03-25T15:00:00"),
        capacity: 100,
        dayId: 2
      },
      {
        name: "Desenvolvimento Mobile: Recriando o Uber",
        locationId: 3,
        startAt: new Date("2023-03-25T12:00:00"),
        endAt: new Date("2023-03-25T16:00:00"),
        capacity: 100,
        dayId: 2
      },
      {
        name: "Como fazer boas sprints reviews?",
        locationId: 1,
        startAt: new Date("2023-03-26T12:00:00"),
        endAt: new Date("2023-03-26T13:00:00"),
        capacity: 100,
        dayId: 3
      },
      {
        name: "Como conseguir aumentar seu salário como dev!",
        locationId: 1,
        startAt: new Date("2023-03-26T13:00:00"),
        endAt: new Date("2023-03-26T14:00:00"),
        capacity: 100,
        dayId: 3
      },
      {
        name: "Encontro com cto's",
        locationId: 2,
        startAt: new Date("2023-03-26T15:00:00"),
        endAt: new Date("2023-03-26T19:00:00"),
        capacity: 150,
        dayId: 3
      },
      {
        name: "Palestra de encerramento do evento!",
        locationId: 3,
        startAt: new Date("2023-03-26T12:00:00"),
        endAt: new Date("2023-03-26T13:00:00"),
        capacity: 150,
        dayId: 3
      },
      {
        name: "Campeonato de lolzinho!",
        locationId: 3,
        startAt: new Date("2023-03-26T13:00:00"),
        endAt: new Date("2023-03-26T16:00:00"),
        capacity: 150,
        dayId: 3
      }
    ]
  });

  console.log({ event });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
