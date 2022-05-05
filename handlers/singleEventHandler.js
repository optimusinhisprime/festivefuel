import Event from "../models/Event";
import { StatusCodes } from "http-status-codes";

const singleEventHandler = async (req, res) => {
  const { eventId } = req.query;

  if (req.method === "GET") {
    const event = await Event.findById(eventId);

    if (!event) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Event not found" });
      return;
    }

    res.status(StatusCodes.OK).json({ event });
  }

  if (req.method === "PATCH") {
    Event.findByIdAndUpdate(
      { _id: eventId },
      { $set: req.body },
      { runValidators: true },
      (err, document) => {
        if (err) {
          res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Unable to update profile", err: err });
        } else if (document == null) {
          res
            .status(StatusCodes.NOT_FOUND)
            .json({ message: "Document doesnt exist." });
        } else {
          res
            .status(StatusCodes.OK)
            .json({ message: " Updated the event successfully" });
        }
      }
    );
  }
};

export { singleEventHandler as singleEventHandler };
