// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body as { email: string; password: string };

    try {

      const response = await axios.post(`${publicRuntimeConfig.API_ENDPOINT}`, {
        email,
        password,
      });

      const { token } = response.data;
      console.log(token);
      res.status(200).json({ token });
    } catch (error : any) {
      res.status(error.response.status).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}