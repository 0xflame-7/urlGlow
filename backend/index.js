import express from "express";
import router from "./routes/url.js";
import connectToMongoDB from "./connect.js";
import URL from "./models/url.js";

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/shortener")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(express.json());

app.use("/url", router);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );

  return res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
