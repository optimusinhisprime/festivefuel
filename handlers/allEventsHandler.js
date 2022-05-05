import Event from "../models/Event";
import { StatusCodes } from "http-status-codes";

const allEventsHandler = async (req, res) => {
  if (req.method === "GET") {
    const events = await Event.find({});

    if (!events) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Events not found" });
      return;
    }

    res.status(StatusCodes.OK).json({ events });
  }

  if (req.method === "POST") {
    const {
      name,
      date,
      time,
      expectedAttendance,
      description,
      images,
      eventCategory,
      organizerId,
    } = req.body;

    const event = new Event({
      name: name,
      date: date,
      time: time,
      expectedAttendance: expectedAttendance,
      description: description,
      images: images,
      eventCategory: eventCategory,
      organizerId: organizerId,
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
