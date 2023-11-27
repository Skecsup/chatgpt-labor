// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  let sk;

  if (req.body.secretKey.length > 0) {
    sk = req.body.secretKey;
  } else {
    sk = process.env.OPENAI_API_KEY;
  }

  let translatedText;

  const gptOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sk}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Do nothing else just translate the text you are given to english. Dont add anything else in you answer, 
          just the text you were provided transleted to english. If the text is already in english give the same text as answer`,
        },
        req.body.message,
      ],

      max_tokens: 200,
    }),
  };
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      gptOptions
    );

    const data = await response.json();
    translatedText = data.choices[0].message.content;
    const options = {
      method: "POST",
      url: "https://text-analysis12.p.rapidapi.com/sentiment-analysis/api/v1.1",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "296bc2910fmshbf5011d968f0574p127724jsn4558eac5b8d8",
        "X-RapidAPI-Host": "text-analysis12.p.rapidapi.com",
      },
      data: {
        language: "english",
        text: translatedText,
      },
    };
    try {
      const response = await axios.request(options);
      console.log(response.data);
      res.send(response.data);
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
  }
}
