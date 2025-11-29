import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.paymentLink.deleteMany();
  await prisma.deliverySchedule.deleteMany();
  await prisma.quoteItem.deleteMany();
  await prisma.quote.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  const users = await prisma.$transaction([
    prisma.user.create({
      data: {
        name: 'Alice Martins',
        email: 'alice.martins@example.com',
        phone: '+55 11 91234-5678',
        addressLine1: 'Rua das Palmeiras, 120',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-000',
        country: 'Brasil',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Bruno Costa',
        email: 'bruno.costa@example.com',
        phone: '+55 21 99876-5432',
        addressLine1: 'Av. Atlântica, 845',
        addressLine2: 'Apto 801',
        city: 'Rio de Janeiro',
        state: 'RJ',
        zipCode: '22010-000',
        country: 'Brasil',
      },
    }),
  ]);

  const products = await prisma.$transaction([
    prisma.product.create({
      data: {
        name: 'Sensor inteligente de energia',
        description: 'Monitora consumo em tempo real e sugere otimizações.',
        basePrice: new Prisma.Decimal('1800'),
        stock: 12,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Painel solar compacto',
        description: 'Kit residencial com instalação rápida.',
        basePrice: new Prisma.Decimal('4200'),
        stock: 8,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Assistente virtual SmartBudget',
        description: 'Automação para gerar orçamentos personalizados.',
        basePrice: new Prisma.Decimal('900'),
        stock: 30,
      },
    }),
  ]);

  const quoteSubtotal = new Prisma.Decimal('6900');
  const discount = new Prisma.Decimal('400');
  const total = quoteSubtotal.minus(discount);

  const quote = await prisma.quote.create({
    data: {
      referenceCode: 'Q-2025-0001',
      userId: users[0].id,
      status: 'SENT',
      notes: 'Entrega prioritária com instalação em até 48h após pagamento.',
      subtotal: quoteSubtotal,
      discounts: discount,
      total,
      items: {
        create: [
          {
            productId: products[0].id,
            quantity: 2,
            unitPrice: products[0].basePrice,
            discount: new Prisma.Decimal('200'),
            total: new Prisma.Decimal('3400'),
          },
          {
            productId: products[2].id,
            quantity: 1,
            unitPrice: products[2].basePrice,
            discount: new Prisma.Decimal('200'),
            total: new Prisma.Decimal('700'),
          },
          {
            productId: products[1].id,
            quantity: 1,
            unitPrice: products[1].basePrice,
            discount: new Prisma.Decimal('0'),
            total: new Prisma.Decimal('4200'),
          },
        ],
      },
      delivery: {
        create: {
          scheduledDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          status: 'SCHEDULED',
          instructions: 'Agendar com a síndica ao chegar ao prédio.',
          addressLine1: 'Rua das Palmeiras, 120',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '01234-000',
          country: 'Brasil',
        },
      },
      paymentLink: {
        create: {
          provider: 'MercadoPago',
          url: 'https://pay.smartbudget.ai/Q-2025-0001',
          expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          status: 'SENT',
          amount: total,
        },
      },
    },
    include: { items: true },
  });

  console.log(`Seeded ${users.length} users, ${products.length} products and quote ${quote.referenceCode}`);
}

main()
  .catch((error) => {
    console.error('Seed failed', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

