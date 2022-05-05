import { StatusCodes } from "http-status-codes";
const User = require("../models/User");
import bcrypt from "bcryptjs";

function validateMethod(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(StatusCodes.METHOD_NOT_ALLOWED);
    res.json({
      message: `Method ${req.method || "is undefined."} Not Allowed`,
    });
    return false;
  }
  return true;
}

function validateRequest(req, res) {
  const { email, password } = req.body;

  if (!email) {
    res.status(StatusCodes.BAD_REQUEST);
    res.json({ message: "Email is required." });
    return false;
  }

  if (!password) {
    res.status(StatusCodes.BAD_REQUEST);
    res.json({ message: "Password is required" });
    return false;
  }

  return { email, password };
}

const loginHandler = async (req, res) => {
  if (!validateMethod(req, res)) {
    return;
  }

  const validRequest = validateRequest(req, res);

  if (!validRequest) {
    return;
  }

  const { email, password } = validRequest;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
    return;
  }

  const passwordsMatch = bcrypt.compareSync(password, user.password);

  if (passwordsMatch) {
    res.status(StatusCodes.OK).json({
      message: "Successfully logged in",
      userID: user._id,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: "Password is incorrect",
    });
  }
};

export { loginHandler as loginHandler };
