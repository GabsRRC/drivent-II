import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import ticketService from "@/services/tickets-service";

export async function getTicketsType(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketTypesData = await ticketService.getTicketType();
    return res.status(httpStatus.OK).send(ticketTypesData);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.send(httpStatus.NO_CONTENT);
    }
  }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const userId  = req.userId;

  try {
    const enrollmentId = await ticketService.getEnrollment(userId);

    if (!enrollmentId) {
      return res.sendStatus(404);
    }

    const ticketData = await ticketService.getTicket(userId);

    if (!ticketData) {
      return res.sendStatus(404);
    } 

    return res.status(httpStatus.OK).send(ticketData);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.send(httpStatus.NO_CONTENT);
    }
  }
}

export async function postTickets(req: AuthenticatedRequest, res: Response) {
  const userId  = req.userId;
  const ticketTypeId = req.body.ticketTypeId;

  try{
    const enrollmentId = await ticketService.getEnrollment(userId);

    if (!enrollmentId) {
      return res.sendStatus(404);
    }
    if (!ticketTypeId) {
      return res.sendStatus(400);
    }

    const newTicketData = await ticketService.postTicket(userId, ticketTypeId);
    return res.status(201).send(newTicketData);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.send(httpStatus.NO_CONTENT);
    }
  }
}
