export class HttpError extends Error {
  message: string;
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.status = status;

    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
