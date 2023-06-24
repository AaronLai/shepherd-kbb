// pages/api/signup.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export default async function (req: NextApiRequest, res: NextApiResponse) {
  console.log(`${publicRuntimeConfig.API_ENDPOINT}/auth/register`,req.body);

  if (req.method === 'POST') {
    const { email, name, password } = req.body as { email: string; name: string; password: string };

    try {

      const response = await axios.post(`${publicRuntimeConfig.API_ENDPOINT}/auth/register`, {
        email,
        name,
        password,
      });

      const { jwt } = response.data;
      res.status(200).json({ jwt });
    } catch (error : any) {


      res.status(error.response.status).json({ message: error.response.data.detail });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}