import { ApplicationError } from "@/protocols";

export function noVacancyError(): ApplicationError {
  return {
    name: "noVacancyError",
    message: "There are no more vacancies!",
  };
}

export function alreadyRegisteredError(): ApplicationError {
    return {
      name: "alreadyRegisteredError",
      message: "You are already registered!",
    };
  }
  
  export function schedulesConflictError(): ApplicationError {
    return {
      name: "schedulesConflictError",
      message: "You are enrolled in an activity that conflicts with your current activity!",
    };
  }