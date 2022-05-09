import StallRequest from "../models/StallRequest";
import { StatusCodes } from "http-status-codes";
import Event from "../models/Event";
import User from "../models/User";
const stallRequestHandler = async (req, res) => {
  if (req.method === "GET") {
    const { vendorId } = req.query;

    // GET REQUEST MADE FOR THE VENDORS STALL REQUESTS
    if (vendorId) {
      StallRequest.find({
        vendor: vendorId,
      })
        .populate({
          path: "event",
          select: "name eventStalls",
          model: Event,
        })
        .populate({
          path: "vendor",
          select: "firstname surname extendProfile",
          model: User,
        })
        .exec()
        .then((docs) => res.status(StatusCodes.OK).json({ stalls: docs }))
        .catch((err) => {
          console.log(err);
          res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: err, stalls: [] });
        });
    } else {
      // GET REQUEST FOR THE STALL REQUESTS PER EVENTS OWNED BY AN ORGANIZER
      const { organizersEventIds } = req.query;
      const eventIdsArray = JSON.parse(organizersEventIds);
      StallRequest.find()
        .where("event")
        .in(eventIdsArray)
        .populate({
          path: "event",
          select: "eventName eventStalls",
          model: Event,
        })
        .populate({
          path: "vendor",
          select: "firstname surname extendProfile",
          model: User,
        })
        .then((docs) => res.status(StatusCodes.OK).json({ stalls: docs }))
        .catch((err) => {
          console.log(err);
          res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: err, stalls: [] });
        });
    }
  }

  if (req.method === "POST") {
    const { vendor, event, stallId } = req.body;

    const request = new StallRequest({
      vendor,
      event,
      stallId,
    });

    request
      .save()
      .then(() => {
        res
          .status(StatusCodes.CREATED)
          .json({ message: "Stall request inserted successfully." });
      })
      .catch((err) => {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: "Unable to save stall request",
          error: err,
        });
      });
  }

  if (req.method === "PATCH") {
    const { stallRequestId } = req.query;

    StallRequest.findByIdAndUpdate(
      { _id: stallRequestId },
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

  if (req.method === "DELETE") {
    const { stallRequestId } = req.query;
    StallRequest.findByIdAndDelete(stallRequestId, function (err, docs) {
      if (err) {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: "Failed to delete stall request.", error: err });
      } else {
        console.log("Deleted : ", docs);
        res.status(StatusCodes.OK).json({ message: "Deleted successfully." });
      }
    });
  }
};

export { stallRequestHandler as stallRequestHandler };
