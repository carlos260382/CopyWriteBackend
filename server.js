const express = require("express");
const cors = require("cors");
const http = require("http");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Text = require("./models/Text.js");
// const reverseText = require("./utils.js");

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
    res.status(200).send({
      ...texts,
      text: createdText,
    });
    console.log("el ultimo text", texts);
  } catch (error) {
    res.status(404).send({ message: "User Not Found" });
  }
});

const httpServer = http.Server(app);

httpServer.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
