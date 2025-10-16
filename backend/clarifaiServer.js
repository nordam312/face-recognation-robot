// clarifaiServer.js
import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(cors());

// معلوماتك من Clarifai
const PAT = "a9f596facab44e97a4dcf46af9ab474c";
const USER_ID = "clarifai";
const APP_ID = "main";
const MODEL_ID = "face-detection";
const MODEL_VERSION_ID = "6dc7e46bc9124c5c8824be4822abe105";

app.post("/face-detect", async (req, res) => {
  try {
    const { imageUrl } = req.body;
    const response = await axios.post(
      `https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`,
      {
        user_app_id: {
          user_id: USER_ID,
          app_id: APP_ID,
        },
        inputs: [
          {
            data: {
              image: {
                url: imageUrl,
                allow_duplicate_url: true,
              },
            },
          },
        ],
      },
      {
        headers: {
          Authorization: `Key ${PAT}`,
          "Content-Type": "application/json",
        },
      }
    );

    // التأكد من نجاح الطلب
    if (response.data.status.code !== 10000) {
      return res.status(400).json({ error: response.data.status.description });
    }

    // إرسال البيانات مباشرة للـ frontend
    res.json(response.data.outputs[0].data.regions || []);
  } catch (err) {
    console.error("Clarifai error:", err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

app.listen(5000, () => console.log("Clarifai proxy running on port 5000"));
