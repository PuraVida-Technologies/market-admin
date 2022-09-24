import AbstractCustomError from "@/errors/AbstractCustomError";

export default class UpstreamRequestFailedError extends AbstractCustomError {
  public httpStatusCode = 500;
  public httpStatusString = "UpstreamRequestFailed";
}
