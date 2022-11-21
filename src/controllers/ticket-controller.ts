import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import ticketService from "@/services/tickets-service";

export async function getTicketsType(req: AuthenticatedRequest, res: Response) {
  try {
    const address = await ticketService.getTicketType();
    return res.status(httpStatus.OK).send(address);
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

    const address = await ticketService.getTicket(userId);

    if (!address) {
      return res.sendStatus(404);
    } 

    return res.status(httpStatus.OK).send(address);
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

    const result = await ticketService.postTicket(userId, ticketTypeId);
    return res.status(201).send(result);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.send(httpStatus.NO_CONTENT);
    }
  }
}
