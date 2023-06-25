// pages/api/projects/[pid].ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export default async function (req: NextApiRequest, res: NextApiResponse) {
  // console.log(`${publicRuntimeConfig.API_ENDPOINT}/project`, req.headers);
  if (req.method === 'GET') {
    try {
      const response = await axios.get(`${publicRuntimeConfig.API_ENDPOINT}/project/${req.query.pid}`)
      const { project } = response.data;
      res.status(200).json({ project });
    } catch (error : any) {
      res.status(error.response.status).json({ message: error.response.data.detail });
    }
  
  }
  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}