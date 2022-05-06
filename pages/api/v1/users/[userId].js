import { databaseConnection } from "../../../../utils/db";
import Cors from "cors";
import { runMiddleware } from "../../../../middleware/initMiddleware";
import { userHandler } from "../../../../handlers/userHandler";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "PATCH"],
});

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  databaseConnection(userHandler, req, res);
}
