import { Request, Response, NextFunction } from "express";

const accessAllowList = ["http://localhost:5173"];
const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

export default (req: Request, res: Response, next: NextFunction) => {
  const requestMethod = req.method;
  const { origin } = req.headers;
  const requestHeaders = req.headers["access-control-request-headers"];

  if (!origin) {
    return res
      .status(403)
      .json({ message: "Отсутствует разрешенный заголовок источника(Origin)" });
  }
  const isAllowOrigin = accessAllowList.includes(origin);

  if (!isAllowOrigin) {
    return res
      .status(403)
      .json({ message: "Отсутствует разрешенный заголовок источника(Origin)" });
  }
  res.header("Access-Control-Allow-Origin", origin);
  if (requestMethod === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
    res.header("Access-Control-Allow-Headers", requestHeaders);
    return res.end();
  }
  next();

  /*  console.log({ requestMethod, origin })
  if (!origin) {
    return res
      .status(403)
      .json({ message: "Отсутствует разрешенный заголовок источника(Origin)" });
  }
  const isAllowedOrigin = accessAllowList.includes(origin);
  if (!isAllowedOrigin) {
    return res
      .status(403)
      .json({ message: "Отсутствует разрешенный заголовок источника(Origin)" });
  }
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
  res.header("Access-Control-Allow-Headers", requestHeaders);
  console.log(res.getHeaders());
  return res.end(); */
};
