import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: 'Driven.t',
        logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
        backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, 'days').toDate(),
      },
    });
  }

  let user = await prisma.user.findFirst();
  if (!user) {
    user = await prisma.user.create({
      data: {
        id: 1,
        email: 'teste@teste.com',
        password: '$2b$12$pdySERaTryk/QkCOP.tR5OA7nMc8nyPJ6vYuZjmtleYX6tukSFm06',
        createdAt: dayjs().toDate(),
        updatedAt: dayjs().toDate(),
      },
    });
  }

  await prisma.enrollment.create({
    data: {
      id: 1,
      name: 'teste',
      cpf: '12345678912',
      birthday: dayjs().toDate(),
      phone: '44999442233',
      userId: 1,
      createdAt: dayjs().toDate(),
      updatedAt: dayjs().toDate(),
    },
  });

  await prisma.address.create({
    data: {
      id: 1,
      cep: '99999999',
      street: 'Teste',
      city: 'Teste',
      state: 'AC',
      number: '111',
      neighborhood: 'Teste',
      addressDetail: 'Teste',
      enrollmentId: 1,
      createdAt: dayjs().toDate(),
      updatedAt: dayjs().toDate(),
    },
  });

  await prisma.ticketType.createMany({
    data: [
      {
        id: 1,
        name: 'Ticket1',
        price: 100,
        isRemote: true,
        includesHotel: false,
        createdAt: dayjs().toDate(),
        updatedAt: dayjs().toDate(),
      },
      {
        id: 2,
        name: 'Ticket2',
        price: 250,
        isRemote: false,
        includesHotel: false,
        createdAt: dayjs().toDate(),
        updatedAt: dayjs().toDate(),
      },
      {
        id: 3,
        name: 'Ticket3',
        price: 600,
        isRemote: false,
        includesHotel: true,
        createdAt: dayjs().toDate(),
        updatedAt: dayjs().toDate(),
      },
    ],
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
