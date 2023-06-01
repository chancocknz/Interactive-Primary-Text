// An express server, which will handle api requests

const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001;

const configuration = new Configuration({
  organization: "org-OhByKI0AfkLE3sRK4WTN8qbN",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
  const { message } = req.body;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Pretend you are an expert in Classical studies. Answer with concise
    and easy to understand answers as though you are speaking to someone who does not
    know very much about Classics.
    Expert: How can I help you today?
    Person: I am trying to read some primary text, but can't understand much of it.
    Expert: That's okay. What is the text?
    Person: Plato's Symposium.
    Expert: Excellent - this is one of my favourites, I find the discussion of love to be transformational.
    Person: Can you please give a short and easy to understand definition of ${message}?
    Expert: `,
    max_tokens: 100,
    temperature: 0,
  });
  console.log(response.data);
  if (response.data.choices[0].text) {
    res.json({
      message: response.data.choices[0].text,
    });
  }
});

app.listen(port, () => {
  console.log("Example app listening");
});
