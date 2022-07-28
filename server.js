import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import http from "http";
import Router from "./routers/routers.js";

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
    console.log("connected online");
  })
  .catch((error) => {
    console.log(error);
  });

// const reverseText = (text) => {
//   const result = text.split("").reverse().join("");

//   return result;
// };

app.use("/", Router);

// app.get("/apihost/iecho/:text", async (req, res) => {
//   try {
//     const reverse = reverseText(req.params.text);
//     const text = new Text({
//       text: reverse,
//     });
//     const createdText = await text.save();
//     const texts = await Text.find();
//     res.status(200).send(texts);
//   } catch (error) {
//     res.status(400).send({ error: "no text" });
//   }
// });

const httpServer = http.Server(app);

httpServer.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});

export default app;
