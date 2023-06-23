// pages/api/projects.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export default async function (req: NextApiRequest, res: NextApiResponse) {
  // console.log(`${publicRuntimeConfig.API_ENDPOINT}/project`, req.headers);
  if (req.method === 'GET') {
    try {
      const response = await axios.get(`${publicRuntimeConfig.API_ENDPOINT}/project`, {
        headers: {
          'token': req.headers['token']
        }
      })
      const { detail } = response.data;
      console.log(response.data);
      res.status(200).json({ detail });
    } catch (error : any) {
      res.status(error.response.status).json({ error: error.message });
    }
  } 
  else if (req.method === 'POST'){
    const { name, role } = req.body as { name: string; role: string; };
    try {

      const response = await axios.post(`${publicRuntimeConfig.API_ENDPOINT}/project`, {
        name,
        role,
      });

      const { detail } = response.data;
      console.log(detail)
      res.status(200).json({ detail });
    } catch (error : any) {


      res.status(error.response.status).json({ error: error.message });
    }
  }else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}