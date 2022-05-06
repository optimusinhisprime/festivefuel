import { databaseConnection } from "../../../../utils/db";
import Cors from "cors";
import { runMiddleware } from "../../../../middleware/initMiddleware";
import { stallRequestHandler } from "../../../../handlers/stallRequestHandler";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "POST", "PATCH", "DELETE"],
});

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  databaseConnection(stallRequestHandler, req, res);
}
