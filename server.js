import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import http from "http";
import Text from "./models/Text.js";

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3001;

mongoose
  .connect(
    "mongodb+srv://copywrite:2022@cluster0.dzizwnj.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("esta conectado base datos");
  })
  .catch((error) => {
    console.log("este es el error", error);
  });

const reverseText = (text) => {
  const result = text.split("").reverse().join("");

  return result;
};

app.get("/apihost/iecho/:text", async (req, res) => {
  console.log("lo que llega params", req.params.text);
  try {
    const reverse = reverseText(req.params.text);
    console.log("el revese", reverse);
    const text = new Text({
      text: reverse,
    });
    console.log("la BD Text", text);
    const createdText = await text.save();
    const texts = await Text.find();
    res.status(200).send(texts);
    console.log("el ultimo text", texts);
  } catch (error) {
    res.status(400).send({ error: "no text" });
  }
});

const httpServer = http.Server(app);

httpServer.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
