import { ErrorRequestHandler } from "express";
import { HttpError } from "../errors/HttpError";

export const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    if(err instanceof HttpError) {
        res.status(err.status).json({ message: err.message })
    } else if(err instanceof Error) {
        res.status(500).json({ message: err.message })
    } else {
        res.status(500).json({ message: "Unexpected error" })
    }
}