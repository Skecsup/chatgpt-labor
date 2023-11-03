// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  console.log(req.body);

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
          content:
            "Act as a sentiment analiser, and return nothing else only a json string that i can use with JSON.parse containing a word that discribes the text, a color in hex format and an emoji",
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
