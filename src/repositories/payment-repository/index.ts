import { prisma } from "@/config";
import { PaymentBody } from "@/protocols";

async function findPaymentId(ticketId: number) {
  return prisma.ticket.findFirst({
    where: { id: ticketId }
  });
}

async function findByUserId(userId: number) {
  const enrollmentData = await prisma.enrollment.findFirst({
    where: { userId: userId }
  });

  const enrollmentId = enrollmentData.id;

  return prisma.ticket.findFirst({
    where: { enrollmentId: enrollmentId }
  });
}

async function findPayment(ticketId: number) {
  return prisma.payment.findFirst({
    where: { ticketId: ticketId }
  });
}

async function updatePayments(userId: number) {
  const enrollmentData = await prisma.enrollment.findFirst({
    where: { userId: userId }
  });

  const enrollmentId = enrollmentData.id;

  return await prisma.ticket.updateMany({
    data: { status: "PAID" },
    where: {
      enrollmentId: enrollmentId
    }
  });
}

async function postPayments(body: PaymentBody, ticketId: number) {
  const ticketTypeData = await prisma.ticket.findFirst({
    where: {
      id: ticketId
    },
    include: {
      TicketType: {
        select: {
          price: true
        }
      }
    }
  });

  const ticketTypePrice = ticketTypeData.TicketType.price;

  const cardDigits = body.cardData.number;

  const cardLastDigits = String(cardDigits).slice(-4);

  return prisma.payment.create({
    data: {
      ticketId: ticketId,
      value: ticketTypePrice,
      cardIssuer: body.cardData.issuer,
      cardLastDigits: cardLastDigits
    }
  });
}

const paymentRepository = {
  findPaymentId,
  findByUserId,
  findPayment,
  updatePayments,
  postPayments
};
  
export default paymentRepository;
