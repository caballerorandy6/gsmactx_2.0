import { prisma } from '../src/libs/prisma';

async function verify() {
  const total = await prisma.subscriber.count();
  const subscribed = await prisma.subscriber.count({ where: { isSubscribed: true } });
  const withToken = await prisma.subscriber.count({
    where: { unsubscribeToken: { not: null } }
  });

  console.log('\n📊 Database Verification:\n');
  console.log(`✅ Total subscribers: ${total}`);
  console.log(`✅ Active (subscribed): ${subscribed}`);
  console.log(`✅ With unsubscribe tokens: ${withToken}`);

  // Check for the corrected email
  const correctedEmail = await prisma.subscriber.findFirst({
    where: { email: 'villedayoni78@gmail.com' }
  });

  if (correctedEmail) {
    console.log(`\n✅ Typo corrected: villedayoni78@gmaol.com → villedayoni78@gmail.com`);
  }

  // Sample of recent subscribers
  const sample = await prisma.subscriber.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    select: { email: true, isSubscribed: true, unsubscribeToken: true }
  });

  console.log('\n📧 Sample of recent subscribers:');
  sample.forEach((s, i) => {
    console.log(`  ${i + 1}. ${s.email} - Token: ${s.unsubscribeToken ? '✅' : '❌'}`);
  });

  await prisma.$disconnect();
}

verify();
