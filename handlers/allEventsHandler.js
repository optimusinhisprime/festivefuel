import Event from "../models/Event";
import { StatusCodes } from "http-status-codes";

const allEventsHandler = async (req, res) => {
  const { organizerId } = req.query;
  if (req.method === "GET") {
    if (organizerId) {
      const events = await Event.find({ organizerId: organizerId }).exec();

      if (!events) {
        res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "No events found", events: [] });
        return;
      }

      res.status(StatusCodes.OK).json({ events });
    } else {
      const events = await Event.find({});

      if (!events) {
        res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "No events found", events: [] });
        return;
      }

      res.status(StatusCodes.OK).json({ events });
    }
  }

  if (req.method === "POST") {
    const {
      name,
      date,
      time,
      venue,
      expectedAttendance,
      description,
      images,
      eventCategory,
      organizerId,
      eventStalls,
    } = req.body;

    const event = new Event({
      name: name,
      date: date,
      time: time,
      venue: venue,
      expectedAttendance: expectedAttendance,
      description: description,
      images: images,
      eventCategory: eventCategory,
      organizerId: organizerId,
      eventStalls: eventStalls,
    });

    event
      .save()
      .then(() => {
        res
          .status(StatusCodes.CREATED)
          .json({ message: "Event created successfully." });
      })
      .catch((err) => {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: "Unable to save profile",
          error: err,
        });
      });
  }
};

export { allEventsHandler as allEventsHandler };
