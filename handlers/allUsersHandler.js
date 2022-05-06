import User from "../models/User";
import { StatusCodes } from "http-status-codes";

const allUsersHandler = async (req, res) => {
  if (req.method === "GET") {
    const users = await User.find({});

    if (!users) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Users not found" });
      return;
    }

    res.status(StatusCodes.OK).json({ users });
  }
};

export { allUsersHandler as allUsersHandler };
