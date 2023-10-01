// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
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
      text: "A love you so much that i would die for you",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
