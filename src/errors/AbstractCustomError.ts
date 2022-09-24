type CustomErrorOptions = {
  source?: Error;
};

export default class AbstractCustomError extends Error {
  public httpStatusCode = 500;
  public httpStatusString = "InternalServerError";
  public source: Error | null = null;

  constructor(message: string, options: CustomErrorOptions = {}) {
    super(message);
    if (options.source) {
      this.source = options.source;
    }
  }
}
