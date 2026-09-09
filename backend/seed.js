const { PrismaClient } = require('@prisma/client');
const fs = require('fs/promises');
const path = require('path');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const usersCount = await prisma.user.count();
  if (usersCount > 0) {
    console.log("Database already seeded.");
    return;
  }

  let dbData = { schemes: [], partners: [] };
  try {
    console.log("Seeding database from db.json...");
    const dbJsonPath = path.join(__dirname, 'db.json');
    const dbDataRaw = await fs.readFile(dbJsonPath, 'utf8');
    dbData = JSON.parse(dbDataRaw);
  } catch (e) {
    console.log("db.json not found, skipping legacy scheme/partner seeding.");
  }

  const salt = await bcrypt.genSalt(10);

  // 1. Seed legacy Schemes
  for (const scheme of dbData.schemes || []) {
    await prisma.scheme.create({ data: scheme });
  }

  // 2. Seed legacy Partners
  for (const partner of dbData.partners || []) {
    await prisma.partner.create({ data: partner });
  }

  // 3. Seed Users (We map legacy to new User model)
  // We need to create roles first.
  const roleApplicant = await prisma.role.create({ data: { name: 'APPLICANT' } });
  const rolePartner = await prisma.role.create({ data: { name: 'PARTNER' } });
  const roleAdmin = await prisma.role.create({ data: { name: 'ADMIN' } });

  // Add the default admin and partner from db.json or hardcoded
  const hashedAdminPass = await bcrypt.hash('admin123', salt);
  await prisma.user.create({
    data: {
      id: 'admin1',
      name: 'System Admin',
      email: 'admin@avenik.com',
      password: hashedAdminPass,
      roles: {
        create: {
          roleId: roleAdmin.id
        }
      }
    }
  });

  const hashedPartnerPass = await bcrypt.hash('partner123', salt);
  await prisma.user.create({
    data: {
      id: 'user_p1',
      name: 'SCA Delhi Branch A',
      email: 'branchA@sca.gov',
      password: hashedPartnerPass,
      roles: {
        create: {
          roleId: rolePartner.id
        }
      }
    }
  });

  console.log("Seeding complete.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
