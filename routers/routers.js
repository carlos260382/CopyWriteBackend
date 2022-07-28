import express from "express";
import Text from "../models/Text.js";
import { reverseText } from "../controllers/controllers.js";
const Router = express.Router();

Router.get("/apihost/iecho/:text", async (req, res) => {
  try {
    const reverse = reverseText(req.params.text);
    const text = new Text({
      text: reverse,
    });
    const createdText = await text.save();
    const texts = await Text.find();
    res.status(200).send(texts);
  } catch (error) {
    res.status(400).send({ error: "no text" });
  }
});

export default Router;
