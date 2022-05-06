import User from "../models/User";
import { StatusCodes } from "http-status-codes";

const userHandler = async (req, res) => {
  const { userId } = req.query;

  if (req.method === "GET") {
    const user = await User.findById(userId);

    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
      return;
    }

    res.status(StatusCodes.OK).json({ user });
  }

  if (req.method === "PATCH") {
    User.findByIdAndUpdate(
      { _id: userId },
      { $set: req.body },
      { runValidators: true },
      (err, document) => {
        if (err) {
          res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Unable to update", err: err });
        } else if (document == null) {
          res
            .status(StatusCodes.NOT_FOUND)
            .json({ message: "Document doesnt exist." });
        } else {
          res
            .status(StatusCodes.OK)
            .json({ message: " Updated user data successfully" });
        }
      }
    );
  }
};

export { userHandler as userHandler };
