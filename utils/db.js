require("dotenv").config();
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";

const databaseConnection = async (endpointHandler, req, res) => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Database connected successfully");
      endpointHandler(req, res);
    })
    .catch((error) => {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Database connection failed" });
      console.log(error);
    });
};

export { databaseConnection as databaseConnection };
