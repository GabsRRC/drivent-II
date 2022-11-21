import { prisma } from "@/config";

async function findTicketsType() {
  return prisma.ticketType.findMany();
}

async function findTickets(userId: number) {
  const ticketData = prisma.enrollment.findFirst({
    where: { userId: userId },
    include: {
      Ticket: {
        include: {
          TicketType: true
        }
      }
    }

  });

  return (await ticketData).Ticket[0];
}

async function findEnrollment(userId: number) {
  const enrollmentData = prisma.enrollment.findFirst({
    where: { userId: userId }
  });
  return enrollmentData;
}

async function postTickets(ticketTypeId: number, userId: number ) {
  const enrollmentData = prisma.enrollment.findFirst({
    where: { userId: userId }
  });

  const enrollmentId = (await enrollmentData).id;

  await prisma.ticket.create({    data: {
    ticketTypeId: ticketTypeId,
    enrollmentId: enrollmentId,
    status: "RESERVED"
  }, });

  const newTicketData = prisma.enrollment.findFirst({
    where: { userId: userId },
    include: {
      Ticket: {
        include: {
          TicketType: true
        }
      }
    }

  });

  return (await newTicketData).Ticket[0];
}

const ticketsTypeRepository = {
  findTicketsType,
  findTickets,
  findEnrollment,
  postTickets
};
  
export default ticketsTypeRepository;
