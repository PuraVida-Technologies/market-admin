import AbstractCustomError from "@/errors/AbstractCustomError";

export default class UpstreamRequestRejectedError extends AbstractCustomError {
  public httpStatusCode = 500;
  public httpStatusString = "UpstreamRequestRejected";
}
