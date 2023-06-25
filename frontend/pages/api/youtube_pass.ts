// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export default async function (req: NextApiRequest, res: NextApiResponse) {
  console.log(`${publicRuntimeConfig.API_ENDPOINT}/builder/passYoutube`,req.body);

  if (req.method === 'POST') {
    const { url, projectId, token } = req.body as { url: string, projectId: string, token: string };

    try {

      const response = await axios.post(`${publicRuntimeConfig.API_ENDPOINT}/builder/passYoutube`, {
        url, projectId
      },{
        headers: {
          token: token
        }
      });

      const { type } = response.data;
      console.log(type);
      res.status(200).json({ type });
    } catch (error : any) {


      res.status(error.response.status).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}