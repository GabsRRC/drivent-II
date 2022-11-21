import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import paymentService from "@/services/payments-service";

export async function getPayment(req: AuthenticatedRequest, res: Response) {
  const userId  = req.userId;
  const { ticketId } = req.query;

  // should respond with status 400 if query param ticketId is missing
  if(!ticketId) {
    return res.sendStatus(400);
  }
    
  try {
    const checkId = await paymentService.getPaymentId(Number(ticketId));

    //should respond with status 404 when given ticket doesnt exist
    if (!checkId) {
      return res.sendStatus(404);
    }

    const checkUser = await paymentService.getByUserId(userId);

    //should respond with status 401 when user doesnt own given ticket
    if(!checkUser) {
      return res.sendStatus(401);
    }

    const address = await paymentService.getPayment(Number(ticketId));

    //should respond with status 200 and with payment data
    return res.status(httpStatus.OK).send(address);
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

  try {
    await paymentService.postPayment(userId, body, ticketId, cardData);

    await paymentService.updatePayments(userId);

    const address = await paymentService.getPayment(Number(ticketId));

    return res.status(200).send(address);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.send(httpStatus.NO_CONTENT);
    }
  }
}
