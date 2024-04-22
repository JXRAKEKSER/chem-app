type tokenPayload = {
    id: number
}

declare namespace Express {
  export interface Request {
    user: tokenPayload;
  }
}
