import { PaymentBody } from "@/protocols";
import paymentRepository from "@/repositories/payment-repository";

async function getPaymentId(ticketId: number) {
  return await paymentRepository.findPaymentId(ticketId);
}

async function getByUserId(userId: number) {
  return await paymentRepository.findByUserId(userId);
}

async function getPayment(ticketId: number) {
  return await paymentRepository.findPayment(ticketId);
}

async function updatePayments(userId: number) {
  return await paymentRepository.updatePayments(userId);
}

async function postPayment(body: PaymentBody, ticketId: number) {
  return await paymentRepository.postPayments(body, ticketId);
}

const paymentService = {
  getPaymentId,
  getByUserId,
  getPayment,
  updatePayments,
  postPayment
};
  
export default paymentService;
