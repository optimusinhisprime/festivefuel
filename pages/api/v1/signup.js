import { databaseConnection } from "../../../utils/db";
import Cors from "cors";
import { runMiddleware } from "../../../middleware/initMiddleware.js";
import { signupHandler } from "../../../handlers/signupHandler";

export const config = {
  api: {
    externalResolver: true,
  },
};

const cors = Cors({
  methods: ["POST"],
});

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  databaseConnection(signupHandler, req, res);
}
