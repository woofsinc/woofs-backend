import { hash } from "bcryptjs";

import { prismaClient as prisma } from "../src/prisma";

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      name: "Alice",
      email: "alice@woofs.com",
      password: await hash("123456", 10),
      cpf: "75902930081",
      phone: "79999999999",
      latitude: -10.928276,
      longitude: -37.047763,
      distanceLimit: 50,
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: "bob@prisma.io" },
    update: {},
    create: {
      name: "Bob",
      email: "bob@woofs.com",
      password: await hash("123456", 10),
      cpf: "75902930081",
      phone: "79999999999",
      latitude: -10.927075,
      longitude: -37.046014,
      distanceLimit: 100,
    },
  });

  const caramelo = await prisma.pet.upsert({
    where: {
      tutorId_name: {
        tutorId: alice.id,
        name: "Caramelo",
      },
    },
    update: {},
    create: {
      tutorId: alice.id,
      name: "Caramelo",
      gender: "MALE",
      breed: "Vira-Lata Caramelo",
      age: 10,
      about: "Lindo, amigável e brincalhão",
      vaccination: true,
      pictures: [],
    },
  });

  const mel = await prisma.pet.upsert({
    where: {
      tutorId_name: {
        tutorId: bob.id,
        name: "Mel",
      },
    },
    update: {},
    create: {
      tutorId: bob.id,
      name: "Mel",
      gender: "FEMALE",
      breed: "Yorkshire Terrier",
      age: 8,
      about: "Linda, quietinha e dengosa",
      vaccination: true,
      pictures: [],
    },
  });

  console.log({ alice, bob, caramelo, mel });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
