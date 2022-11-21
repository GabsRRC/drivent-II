import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import paymentService from "@/services/payments-service";

export async function getPayment(req: AuthenticatedRequest, res: Response) {
  const userId  = req.userId;
  const { ticketId } = req.query;

  if(!ticketId) {
    return res.sendStatus(400);
  }
    
  try {
    const checkId = await paymentService.getPaymentId(Number(ticketId));

    if (!checkId) {
      return res.sendStatus(404);
    }

    const checkUser = await paymentService.getByUserId(userId);

    if(!checkUser) {
      return res.sendStatus(401);
    }

    const result = await paymentService.getPayment(Number(ticketId));

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.send(httpStatus.NO_CONTENT);
    }
  }
}

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  const body = req.body;
  const userId: number = req.userId;
  const ticketId: number = req.body.ticketId;
  const cardData: object = req.body.cardData;

  try {
    if (!body.ticketId || !body.cardData) {
      return res.sendStatus(400);
    }
  
    const checkId = await paymentService.getPaymentId(ticketId);
  
    if (!checkId) {
      return res.sendStatus(404);
    }
  
    const checkUser = await paymentService.getByUserId(userId);
  
    if(!checkUser) {
      return res.sendStatus(401);
    }

    await paymentService.postPayment(userId, body, ticketId, cardData);

    await paymentService.updatePayments(userId);

    const newPaymentData = await paymentService.getPayment(ticketId);

    return res.status(200).send(newPaymentData);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.send(httpStatus.NO_CONTENT);
    }
  }
}
