import StallRequest from "../models/StallRequest";
import { StatusCodes } from "http-status-codes";

const stallRequestHandler = async (req, res) => {
  if (req.method === "GET") {
    const { vendorId } = req.query;

    const stalls = await StallRequest.find({
      vendorId: vendorId,
    }).exec();

    if (!stalls) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Stall request not found" });
      return;
    }

    res.status(StatusCodes.OK).json({ stalls });
  }

  if (req.method === "POST") {
    const { vendorId, eventId, stallId } = req.body;

    const request = new StallRequest({
      vendorId,
      eventId,
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
