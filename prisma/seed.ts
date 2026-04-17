import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Start seeding...');

  // Create roles
  const adminRole = await prisma.role.create({
    data: {
      name: 'admin',
    },
  });

  const userRole = await prisma.role.create({
    data: {
      name: 'user',
    },
  });

  const moderatorRole = await prisma.role.create({
    data: {
      name: 'moderator',
    },
  });

  console.log('Created roles:', { adminRole, userRole, moderatorRole });

  // Create users
  const adminUser = await prisma.user.create({
    data: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'admin@example.com',
      username: 'admin',
      password: 'hashed_password_here', // In real scenario, use bcrypt or similar
    },
  });

  const regularUser = await prisma.user.create({
    data: {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'user@example.com',
      username: 'janesmith',
      password: 'hashed_password_here',
    },
  });

  const moderatorUser = await prisma.user.create({
    data: {
      firstName: 'Bob',
      lastName: 'Johnson',
      email: 'moderator@example.com',
      username: 'bobjohnson',
      password: 'hashed_password_here',
    },
  });

  console.log('Created users:', { adminUser, regularUser, moderatorUser });

  // Assign roles to users
  // Assign admin role to admin user
  await prisma.roles_Users.create({
    data: {
      userId: adminUser.id,
      roleId: adminRole.id,
    },
  });

  // Assign user role to regular user
  await prisma.roles_Users.create({
    data: {
      userId: regularUser.id,
      roleId: userRole.id,
    },
  });

  // Assign both user and moderator roles to moderator user
  await prisma.roles_Users.create({
    data: {
      userId: moderatorUser.id,
      roleId: userRole.id,
    },
  });

  await prisma.roles_Users.create({
    data: {
      userId: moderatorUser.id,
      roleId: moderatorRole.id,
    },
  });

  console.log('Assigned roles to users');

  // Optional: Create additional sample users
  const sampleUsers = [
    {
      firstName: 'Alice',
      lastName: 'Williams',
      email: 'alice@example.com',
      username: 'alicew',
      password: 'hashed_password_here',
    },
    {
      firstName: 'Charlie',
      lastName: 'Brown',
      email: 'charlie@example.com',
      username: 'charlieb',
      password: 'hashed_password_here',
    },
    {
      firstName: 'Diana',
      lastName: 'Prince',
      email: 'diana@example.com',
      username: 'dianap',
      password: 'hashed_password_here',
    },
  ];

  for (const userData of sampleUsers) {
    const user = await prisma.user.create({
      data: userData,
    });

    // Assign default user role to sample users
    await prisma.roles_Users.create({
      data: {
        userId: user.id,
        roleId: userRole.id,
      },
    });
  }

  console.log(
    `Created ${sampleUsers.length} additional sample users with user role`,
  );

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
