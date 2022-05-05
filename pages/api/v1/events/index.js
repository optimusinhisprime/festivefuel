import { databaseConnection } from "../../../../utils/db";
import Cors from "cors";
import { runMiddleware } from "../../../../middleware/initMiddleware";
import { allEventsHandler } from "../../../../handlers/allEventsHandler";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET"],
});

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  databaseConnection(allEventsHandler, req, res);
}
