// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export default async function (req: NextApiRequest, res: NextApiResponse) {
  console.log(`${publicRuntimeConfig.API_ENDPOINT}/auth/login`,req.body);

  if (req.method === 'POST') {
    const { email, password } = req.body as { email: string; password: string };

    try {

      const response = await axios.post(`${publicRuntimeConfig.API_ENDPOINT}/auth/login`, {
        email,
        password,
      });

      const { jwt } = response.data;
      console.log(jwt);
      res.status(200).json({ jwt });
    } catch (error : any) {

      console.log(error.response.data.detail);
      res.status(error.response.status).json({ message: error.response.data.detail });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}