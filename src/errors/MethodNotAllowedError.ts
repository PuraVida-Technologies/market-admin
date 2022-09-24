import AbstractCustomError from "@/errors/AbstractCustomError";

export default class MethodNotAllowedError extends AbstractCustomError {
  public httpStatusCode = 405;
  public httpStatusString = "MethodNotAllowed";
}
