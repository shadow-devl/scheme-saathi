const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Seed Roles
  const roles = ['ENTREPRENEUR', 'INVESTOR', 'USER', 'ADMIN', 'MENTOR'];
  const createdRoles = {};

  for (const roleName of roles) {
    let role = await prisma.role.findUnique({ where: { name: roleName } });
    if (!role) {
      role = await prisma.role.create({
        data: { name: roleName, description: `${roleName} Role` },
      });
      console.log(`Created Role: ${roleName}`);
    } else {
      console.log(`Role ${roleName} already exists.`);
    }
    createdRoles[roleName] = role;
  }

  // 2. Seed Demo Accounts (if not exists)
  const defaultPassword = await bcrypt.hash('Demo@123', 10);
  
  const demoAccounts = [
    { email: 'demo.user@schemesaathi.com', name: 'Demo User', role: 'USER' },
    { email: 'demo.entrepreneur@schemesaathi.com', name: 'Demo Entrepreneur', role: 'ENTREPRENEUR' },
    { email: 'demo.investor@schemesaathi.com', name: 'Demo Investor', role: 'INVESTOR' },
  ];

  for (const account of demoAccounts) {
    let user = await prisma.user.findUnique({ where: { email: account.email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: account.email,
          name: account.name,
          password: defaultPassword,
          emailVerifiedAt: new Date(),
          status: 'ACTIVE',
          isDemo: true,
          roles: {
            create: [
              {
                role: {
                  connect: { name: account.role }
                }
              }
            ]
          }
        },
      });
      console.log(`Created Demo Account: ${account.email} with Role: ${account.role}`);
    } else {
      console.log(`Demo Account ${account.email} already exists.`);
    }
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
