import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      name: 'Alice Martins',
      email: 'alice.martins@example.com',
      phone: '+55 11 91234-5678',
    },
    {
      name: 'Bruno Costa',
      email: 'bruno.costa@example.com',
      phone: '+55 21 99876-5432',
    },
    {
      name: 'Carla Souza',
      email: 'carla.souza@example.com',
      phone: '+55 31 98765-4321',
    },
  ];

  await prisma.user.deleteMany();
  await prisma.user.createMany({ data: users });

  console.log(`Seeded ${users.length} users`);
}

main()
  .catch((error) => {
    console.error('Seed failed', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

