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
      const { projects } = response.data;
      console.log(projects)
      res.status(200).json({ projects });
    } catch (error : any) {
      res.status(error.response.status).json({ message: error.response.data.detail });
    }
  } 
  else if (req.method === 'POST'){
    const { name, role, status } = req.body as { name: string; role: string; status: string };
    try {

      const response = await axios.post(`${publicRuntimeConfig.API_ENDPOINT}/project`, {
        name,
        role,
        status
      },
      {
        headers: {
          'token': req.headers['token']
        }
      });

      const { project } = response.data;
      res.status(200).json({ project });
    } catch (error : any) {


      res.status(error.response.status).json({ message: error.response.data.detail });
    }
  }else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}