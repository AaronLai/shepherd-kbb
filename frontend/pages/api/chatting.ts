// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export default async function (req: NextApiRequest, res: NextApiResponse) {
  console.log(`${publicRuntimeConfig.API_ENDPOINT}/chatting`,req.body);

  if (req.method === 'POST') {
    const { projectId, userId, nameSpace, text, history } = req.body as { projectId: string, userId: string, nameSpace: string, text: string, history: Array<MessageHistory> };

    try {
      const response = await axios.post(`${publicRuntimeConfig.API_ENDPOINT}/chatting`, {
        projectId, userId, nameSpace, text, history
      });

      const { answer, source } = response.data;
      console.log(answer);
      res.status(200).json({ answer, source });
    } catch (error : any) {
      res.status(error.response.status).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}