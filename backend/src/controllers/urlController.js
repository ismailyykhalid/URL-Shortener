import { nanoid } from "nanoid";
import URL from "../models/urlModel.js";

export const handelGenerateShortURL = async (req, res) => {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ error: "URL is required" });
    console.log("Error: URL is required");
  }
  try {
    const shortId = nanoid(8);
    const newURL = await URL.create({
      shortId: shortId,
      redirectURL: body.url,
      visitHistory: [],
    });

    res.status(200).json({ URL_created: newURL });
  } catch (error) {
    res.status(401).json({ error: error.message });
    console.log(error.message);
  }
};

// HANDEL REDIRECT

export const handelRedirect = async (req, res) => {
  const shortId = req.params.shortId;

  try {
    const result = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: { timestamps: Date.now() },
        },
      }
    );
    res.redirect(result.redirectURL);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//HANDEL CLICKS
export const handelClicks = async (req, res) => {
  const shortId = req.params.shortId;

  try {
    const result = await URL.findOne({ shortId });
    res.json({
      "Totaal clicks": result.visitHistory.length,
      Analytics: result.visitHistory,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
