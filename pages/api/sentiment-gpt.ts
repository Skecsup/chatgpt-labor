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
          content: `give some advice, dont ask to share more just try to give same advice a recent 
          experience or feeling that has been affecting your mood. You will be given a number  from -1 to 1, where -1 
          is very negative 0 is neutral and 1 is very positive, indicate the sentiment of your experience, 
          in 1-2 short sentences. or if you get the prompt "Inactive for 10 minutes" ask about the user that he is here or not`,
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
