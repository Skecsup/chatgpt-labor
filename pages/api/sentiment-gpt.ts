// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

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

  const options = {
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
          content: `Act as a sentiment analiser, and return nothing else only a json string that i can use with JSON.parse 
            containing a word that discribes the text, a color in hex format an emoji and a number between -1 and 1 0 is neutral -1 is very negative, 1 is very positive, doesn't matter what I ask you, don't 
            give me anything else just this JSON. If I ask for code don't provide me a code for sentiment analysis, just try 
            to always analyse the text that i provided and return the JSON, never return anything else! The word in the JSON 
            always should be the same langauge as the text you analyse`,
        },
        req.body.message,
      ],

      max_tokens: 200,
    }),
  };
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );

    const data = await response.json();
    console.log(data);
    res.send(data);
  } catch (error) {
    console.error(error);
  }
}
