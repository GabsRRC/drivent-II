import ticketTypeRepository from "@/repositories/ticket-repository";

async function getTicketType() {
  return await ticketTypeRepository.findTicketsType();
}

async function getEnrollment(userId: number) {
  return await ticketTypeRepository.findEnrollment(userId);
}

async function getTicket(userId: number) {
  return await ticketTypeRepository.findTickets(userId);
}

async function postTicket(ticketTypeId: number, userId: number) {
  return await ticketTypeRepository.postTickets(userId, ticketTypeId);
}

const ticketService = {
  getTicketType,
  getEnrollment,
  getTicket,
  postTicket
};
  
export default ticketService;
