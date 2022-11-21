import { prisma } from "@/config";

async function findTicketsType() {
  return prisma.ticketType.findMany();
}

async function findTickets(userId: number) {
  const result = prisma.enrollment.findFirst({
    where: { userId: userId },
    include: {
      Ticket: {
        include: {
          TicketType: true
        }
      }
    }

  });
 
  const newData = (await result).Ticket[0];

  return newData;
}

async function findEnrollment(userId: number) {
  const result = prisma.enrollment.findFirst({
    where: { userId: userId }
  });
  return result;
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

  const result = prisma.enrollment.findFirst({
    where: { userId: userId },
    include: {
      Ticket: {
        include: {
          TicketType: true
        }
      }
    }

  });
 
  const newData = (await result).Ticket[0];
    
  return newData;
}

const ticketsTypeRepository = {
  findTicketsType,
  findTickets,
  postTickets,
  findEnrollment
};
  
export default ticketsTypeRepository;
