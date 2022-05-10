const User = require("../models/User");
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

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

const signupHandler = async (req, res) => {
  if (!validateMethod(req, res)) {
    return;
  }

  const { email, password, firstname, surname, phoneNumber, role, address } =
    req.body;

  //check if username already exists
  const user = await User.findOne({ email });

  if (user) {
    res
      .status(StatusCodes.FORBIDDEN)
      .json({ message: "Email address already taken." });
    return;
  } else {
    //Create user
    let newUser;
    const emailArray = email.split("@");
    if (emailArray[1] === "festivalfuel.co.bw") {
      newUser = new User({
        firstname: firstname,
        surname: surname,
        phoneNumber: phoneNumber,
        role: "admin",
        address: address,
        email: email,
        password: password,
      });
    } else {
      newUser = new User({
        firstname: firstname,
        surname: surname,
        phoneNumber: phoneNumber,
        role: role,
        address: address,
        email: email,
        password: password,
      });
    }

    const salt = await bcrypt.genSalt(10);

    newUser.password = await bcrypt.hash(newUser.password, salt);

    newUser
      .save()
      .then(() => {
        res
          .status(StatusCodes.CREATED)
          .json({ message: "Account created successfully" });
      })
      .catch((error) => {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: "Account creation failed" });
        console.log(error);
      });
  }
};

export { signupHandler as signupHandler };
