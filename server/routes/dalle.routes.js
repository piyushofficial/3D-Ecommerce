import * as dotenv from "dotenv";
import express from "express";

import { OpenAI } from "openai";

dotenv.config();

const router = express.Router();

const config = {
  apiKey: process.env["OPENAI_API_KEY"],
};

const openai = new OpenAI(config);

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello from DALL.E ROUTES" });
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      response_format: "b64_json",
      size: "1024x1024",
    });

    const image = response.data[0].b64_json;

    res.status(200).json({ photo: image });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
