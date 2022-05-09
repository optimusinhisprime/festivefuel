import Event from "../models/Event";
import { StatusCodes } from "http-status-codes";
import formidable from "formidable";
const { Storage } = require("@google-cloud/storage");
const bucketName = "festival-fuel-420";
const path = require("path");
const fs = require("fs");
const shortid = require("shortid");

async function uploadFile(bucketName, filepath) {
  const storage = new Storage({
    projectId: "festival-fuel-420",
    keyFilename: path.join(
      __dirname,
      "../../../../../festival-fuel-420-7e4ccf7659fa.json"
    ),
  });

  const params = { metadata: { cacheControl: "public, max-age=31536000" } };
  await storage.bucket(bucketName).upload(filepath, params);
  // console.log(`${filepath} uploaded to ${bucketName}.`);
}
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
    const form = formidable({});
    const uploadFolder = path.join(
      __dirname,
      "../../../../..//public",
      "files"
    );
    form.uploadDir = uploadFolder;

    let data;
    form.parse(req, (err, fields, files) => {
      if (err) {
        res.writeHead(err.httpCode || 400, { "Content-Type": "text/plain" });
        res.end(String(err));
        return;
      }
      let filename = files.images[0].originalFilename;
      let imgPath = files.images[0].filepath;
      const validFilename =
        shortid.generate() + encodeURIComponent(filename.replace(/\s/g, "-"));

      try {
        // renames the file in the directory
        fs.renameSync(imgPath, path.join(uploadFolder, validFilename));
      } catch (error) {
        console.log(error);
      }

      uploadFile(bucketName, path.join(uploadFolder, validFilename)).catch(
        console.error
      );

      const imageUrl = `https://storage.googleapis.com/${bucketName}/${validFilename}`;
      const event = new Event({
        eventName: fields.eventName[0],
        date: fields.date[0],
        time: fields.time[0],
        venue: fields.venue[0],
        expectedAttendance: fields.expectedAttendance[0],
        description: fields.description[0],
        images: [imageUrl],
        eventCategory: fields.eventCategory,
        organizerId: fields.organizerId[0],
        eventStalls: JSON.parse(fields.eventStalls),
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
    });
  }
};

export { allEventsHandler as allEventsHandler };
export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
};
