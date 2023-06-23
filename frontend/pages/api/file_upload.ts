// pages/api/file_upload.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export default async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { file } = req.body as { file: File };
        try {

        const response = await axios.post(`${publicRuntimeConfig.API_ENDPOINT}/builder/uploadFile`, {
            file
        });

        const { detail } = response.data;
        res.status(200).json({ detail });
        } catch (error : any) {


        res.status(error.response.status).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}