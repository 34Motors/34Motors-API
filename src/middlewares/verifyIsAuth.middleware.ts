import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

const verifyIsAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Token inválido, faça login com suas credenciais" });
  }

  const tokenSplited = token.split(" ")[1];

  jwt.verify(
    tokenSplited,
    process.env.SECRET_KEY!,
    (error: any, decoded: any) => {
      if (error) {
        return res
          .status(401)
          .json({ message: "Token inválido, faça login com suas credenciais" });
      }

      res.locals.userId = decoded.sub;  

      next();
    }
  );
};

export default verifyIsAuth;
