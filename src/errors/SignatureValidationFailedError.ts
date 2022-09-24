import AbstractCustomError from "@/errors/AbstractCustomError";

export default class SignatureValidationFailedError extends AbstractCustomError {
  public httpStatusCode = 401;
  public httpStatusString = "SignatureValidationFailed";
}
