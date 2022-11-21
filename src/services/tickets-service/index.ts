import { notFoundError } from "@/errors";
import ticketTypeRepository from "@/repositories/ticket-repository";

async function getTicketType() {
  const result = await ticketTypeRepository.findTicketsType();

  if (!result) {
    throw notFoundError();
  }
  return result;
}

async function getEnrollment(userId: number) {
  const result = await ticketTypeRepository.findEnrollment(userId);
  return result;
}

async function getTicket(userId: number) {
  //const result2 = await ticketTypeRepository.findEnrollment(userId);
  const result = await ticketTypeRepository.findTickets(userId);
  
  // if (!result.id || !result2.id) {
  //   return 404
  // }
  
  return result;
}

async function postTicket(ticketTypeId: number, userId: number) {
  const result = await ticketTypeRepository.postTickets(userId, ticketTypeId);
  
  if (!result) {
    throw notFoundError();
  }

  return result;
}

const ticketService = {
  getTicketType,
  getTicket,
  postTicket,
  getEnrollment
};
  
export default ticketService;
