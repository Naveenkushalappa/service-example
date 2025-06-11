import { IOClient, IOContext, InstanceOptions, IOResponse } from "@vtex/api";
import { VTEX_APP_KEY, VTEX_APP_TOKEN } from '../config'

export default class UploadFile extends IOClient {
    constructor(context: IOContext, options?: InstanceOptions) {
        super(context, options)
    }

    public async uploadFileWithHeaders(file: string | Blob, documentId: string): Promise<IOResponse<string>> {
        const headers = new Headers({
            "Accept": "application/vnd.vtex.ds.v10+json",
            "X-VTEX-API-AppKey": VTEX_APP_KEY,
            "X-VTEX-API-AppToken": VTEX_APP_TOKEN,
            'X-VTEX-Use-Https': 'true'
        });

        console.log(headers, 'headers')
        console.log(file, 'file')
        console.log(documentId, 'documentId')
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(`https://trika.vtexcommercestable.com.br/api/dataentities/NC/documents/${documentId}/fileLink/attachments`, {
            method: "POST",
            headers,
            body: formData,
        });

        //const endpoint = `https://trika.vtexcommercestable.com.br/api/dataentities/NC/documents/${documentId}/fileLink/attachments`



        // try {
        //     const result = await ctx.clients.http.post(endpoint, formData, { headers })
        //     ctx.body = { success: true, data: result }
        // } catch (err) {
        //     console.error(err)
        //     ctx.status = 500
        //     ctx.body = 'Upload failed'
        // }

        console.log(response, 'response')
        const data = await response.text();
        const responseHeaders: Record<string, string> = {};
        response.headers.forEach((value, key) => {
            responseHeaders[key] = value;
        });

        return {
            data,
            headers: responseHeaders,
            status: response.status
        };
    }
}