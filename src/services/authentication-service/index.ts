import enrollmentRepository from "@/repositories/enrollment-repository";
import sessionRepository from "@/repositories/session-repository";
import ticketRepository from "@/repositories/ticket-repository";
import userRepository from "@/repositories/user-repository";
import { exclude } from "@/utils/prisma-utils";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { invalidCredentialsError } from "./errors";

async function signIn(params: SignInParams): Promise<SignInResult> {
  const { email, password } = params;

  const user = await getUserOrFail(email);

  await validatePasswordOrFail(password, user.password);

  const token = await createSession(user.id);
  const statusPayment = await findStatusPaymentByUserId(user.id) as unknown;

  return {
    user: exclude(user, "password"),
    token,
    statusPayment: statusPayment as TicketStatus || null
  };
}

async function getUserOrFail(email: string): Promise<GetUserOrFailResult> {
  const user = await userRepository.findByEmail(email, { id: true, email: true, password: true });
  if (!user) throw invalidCredentialsError();

  return user;
}

async function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  await sessionRepository.create({
    token,
    userId,
  });

  return token;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

enum TicketStatus {
  RESERVED,
  PAID
}

async function findStatusPaymentByUserId(userId: number) {
  const enrollmentId = await enrollmentRepository.findWithAddressByUserId(userId);
  if(!enrollmentId) return "RESERVED";
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollmentId.id);
  return ticket.status;
}

export type SignInParams = Pick<User, "email" | "password">;

type SignInResult = {
  user: Pick<User, "id" | "email">;
  token: string;
  statusPayment: TicketStatus
};

type GetUserOrFailResult = Pick<User, "id" | "email" | "password">;

const authenticationService = {
  signIn,
};

export default authenticationService;
export * from "./errors";
