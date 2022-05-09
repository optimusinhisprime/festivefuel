import { databaseConnection } from "../../../../utils/db";
import Cors from "cors";
import { runMiddleware } from "../../../../middleware/initMiddleware";
import { allEventsHandler } from "../../../../handlers/allEventsHandler";
import formidable from "formidable";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "POST"],
});

export { allEventsHandler as allEventsHandler };
export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
};

export default async (req, res) => {
  await runMiddleware(req, res, cors);

  databaseConnection(allEventsHandler, req, res);
};
