// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export default async function (req: NextApiRequest, res: NextApiResponse) {
  console.log(`${publicRuntimeConfig.API_ENDPOINT}/chatting`,req.body);

  if (req.method === 'POST') {
    const { projectId, userId, nameSpace, text } = req.body as { projectId: string, userId: string, nameSpace: string, text: string };

    try {

      const response = await axios.post(`${publicRuntimeConfig.API_ENDPOINT}/chatting`, {
        projectId, userId, nameSpace, text
      });

      const { answer } = response.data;
      console.log(answer);
      res.status(200).json({ answer });
      return answer
    } catch (error : any) {


      res.status(error.response.status).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}