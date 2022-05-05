import { databaseConnection } from "../../../utils/db";
import Cors from "cors";
import { runMiddleware } from "../../../middleware/initMiddleware";
import { loginHandler } from "../../../handlers/loginHandler";

// Initializing the cors middleware
const cors = Cors({
  methods: ["POST"],
});

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  databaseConnection(loginHandler, req, res);
}
