import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clear existing users first (optional - be careful with this in production!)
  // await prisma.user.deleteMany({});

  const users = await Promise.all([
    prisma.user.upsert({
      where: { username: 'alexey_volkov' },
      update: {},
      create: {
        email: 'alexey.volkov@example.com',
        firstName: 'Алексей',
        lastName: 'Волков',
        password: 'xK7#mP9$rT2&vN5@qW8',
        username: 'alexey_volkov',
      },
    }),

    prisma.user.upsert({
      where: { username: 'elena_sokolova' },
      update: {},
      create: {
        email: 'elena.sokolova@example.com',
        firstName: 'Елена',
        lastName: 'Соколова',
        password: 'jL4@fR1!zB6^hY3*eX9',
        username: 'elena_sokolova',
      },
    }),

    prisma.user.upsert({
      where: { username: 'dmitry_morozov' },
      update: {},
      create: {
        email: 'dmitry.morozov@example.com',
        firstName: 'Дмитрий',
        lastName: 'Морозов',
        password: 'pQ2#wN8$cV5&kM1@rT7',
        username: 'dmitry_morozov',
      },
    }),

    prisma.user.upsert({
      where: { username: 'anna_ivanova' },
      update: {},
      create: {
        email: 'anna.ivanova@example.com',
        firstName: 'Анна',
        lastName: 'Иванова',
        password: 'aF9^dS3!gH6*jK4@lM2',
        username: 'anna_ivanova',
      },
    }),

    prisma.user.upsert({
      where: { username: 'mikhail_fedorov' },
      update: {},
      create: {
        email: 'mikhail.fedorov@example.com',
        firstName: 'Михаил',
        lastName: 'Фёдоров',
        password: 'uJ7#oI4$pT8&nY1@bV3',
        username: 'mikhail_fedorov',
      },
    }),

    prisma.user.upsert({
      where: { username: 'olga_kozlova' },
      update: {},
      create: {
        email: 'olga.kozlova@example.com',
        firstName: 'Ольга',
        lastName: 'Козлова',
        password: 'wQ5@eR2!yU7^tA4*iO9',
        username: 'olga_kozlova',
      },
    }),

    prisma.user.upsert({
      where: { username: 'sergey_novikov' },
      update: {},
      create: {
        email: 'sergey.novikov@example.com',
        firstName: 'Сергей',
        lastName: 'Новиков',
        password: 'cV3#zX8$bN6&mM1@lK4',
        username: 'sergey_novikov',
      },
    }),
  ]);

  console.log('Created 7 Russian users with random passwords:');
  users.forEach((user) => {
    console.log(
      `- ${user.firstName} ${user.lastName} (${user.username}): ${user.password}`,
    );
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
