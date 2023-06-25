// pages/api/projects/[pid]/documents.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export default async function (req: NextApiRequest, res: NextApiResponse) {
  // console.log(`${publicRuntimeConfig.API_ENDPOINT}/project`, req.headers);
  if (req.method === 'GET') {
    try {
        console.log(req.headers)
      const response = await axios.get(`${publicRuntimeConfig.API_ENDPOINT}/project/${req.query.pid}/documents`, {
        headers: {
            'token': req.headers.token
        }
      })
      const { documents } = response.data;
      res.status(200).json({ documents });
    } catch (error : any) {
      res.status(error.response.status).json({ message: error.response.data.detail });
    }
  
  }
  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}