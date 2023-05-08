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
      model: req.body.model || "gpt-3.5-turbo",
      messages:
        req.body.mode !== ""
          ? [{ role: "system", content: req.body.mode }, ...req.body.message]
          : req.body.message,
      max_tokens: 100,
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
