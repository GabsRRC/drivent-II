import { Ticket } from "@prisma/client";

export type ApplicationError = {
  name: string;
  message: string;
};

export type ViaCEPAddress = {
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string,
  uf: string,

};

export type AddressEnrollment = {
  logradouro: string,
  complemento: string,
  bairro: string,
  cidade: string,
  uf: string,
  error?: string

};

export type RequestError = {
  status: number,
  data: object | null,
  statusText: string,
  name: string,
  message: string,
};

export type NewTicket = Omit<Ticket, "id">;

export type UpdateTicket = Partial<Ticket>;

export type NewTickets = {
  ticketTypeId: number,
  enrollmentId: number,
  status: string,
  createdAt?: string,
  updateAt?: string
}

//export type NewTicket = Partial<Ticket>;

