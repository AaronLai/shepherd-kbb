// pages/api/file_upload.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export default async function (req: NextApiRequest, res: NextApiResponse) {

    const body = req.body
    if (req.method === 'POST') {
        try {
            console.log("file upload ",body);
            const response = await axios.post(`${publicRuntimeConfig.API_ENDPOINT}/builder/uploadFile`, body , { headers: {
                "Content-Type": "multipart/form-data",
                'token': req.headers['token']

              }}
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