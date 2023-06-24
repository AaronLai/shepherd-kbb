// pages/api/file_upload.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export default async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const {file} = req.body as {file: File}
            console.log(file);
            const response = await axios.post(`${publicRuntimeConfig.API_ENDPOINT}/builder/uploadFile`, {file}
            );
            const { status, message } = response.data;
            res.status(200).json({ status, message });
            } catch (error : any) {
                res.status(error.response.status).json({ error: error.message });
                console.log(error.response.data);
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}