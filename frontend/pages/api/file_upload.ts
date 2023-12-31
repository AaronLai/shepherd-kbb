// pages/api/file_upload.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import getConfig from 'next/config';
import formidable from 'formidable';
const { publicRuntimeConfig } = getConfig();

export default async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {

            const form = formidable({});


            form.parse(req, async (err, fields, files) => {

                if (err) {
                    console.error('Error parsing form data:', err);
                    res.status(500).json({ error: 'Internal Server Error' });
                    return;
                }

                let file;
                const formData = new FormData();

                if (Array.isArray(files.file)) {
                    // handle case where files.file is an array
                    file = fs.createReadStream(files.file[0].filepath);

                } else {
                    // handle case where files.file is a single object
                    file = fs.createReadStream(files.file.filepath);


                }

                formData.append(
                    'file',
                    file,
                    (Array.isArray(files.file) ? files.file[0].originalFilename : files.file.originalFilename) || 'default_filename'
                );

                formData.append('projectId',fields.projectId[0]);

                try {
                    const response = await axios.post(`${publicRuntimeConfig.API_ENDPOINT}/builder/uploadFile`, formData, {
                        headers: {
                            ...formData.getHeaders(),
                            'token': req.headers["token"]
                        },
                    });
                    const { status, message } = response.data;
                    res.status(200).json({ status, message });
                }
                catch (error: any) {
                    res.status(error.response?.status || 500).json({ error: error.message });
                }
            });
        } catch (error: any) {

            console.log(error.response?.data);

            res.status(error.response?.status || 500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}



export const config = {
    api: {
        bodyParser: false,
    },
};
