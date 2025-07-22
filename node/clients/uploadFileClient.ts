import { IOClient, IOContext, InstanceOptions, IOResponse } from '@vtex/api'
import { VTEX_APP_KEY, VTEX_APP_TOKEN } from '../config'
import fs from 'fs'
import FormData from 'form-data'

export default class UploadFile extends IOClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, options)
  }

  public async uploadFileWithHeaders(
    file: any,
    documentId: string
  ): Promise<IOResponse<string>> {
    const headers = {
      'Accept': 'application/json',
      'X-VTEX-API-AppKey': VTEX_APP_KEY,
      'X-VTEX-API-AppToken': VTEX_APP_TOKEN,
      'X-VTEX-Use-Https': 'true',
    }

    try {
      let formData = new FormData()

      if (file?.filepath && file?.originalFilename && file?.mimetype) {
        const stream = fs.createReadStream(file.filepath)
        formData.append('file', stream, {
          filename: file.originalFilename,
          contentType: file.mimetype,
        })
      } else {
        throw new Error('Invalid file object from Koa')
      }


      const response = await this.http.postRaw(
        `/api/dataentities/NC/documents/${documentId}/fileLink/attachments`,
        formData,
        {
          headers: {
            ...headers,
            ...formData.getHeaders(), 
          },
          timeout: 30000
        }
      )

      return {
        data: "success",
        headers: response.headers || {},
        status: response.status || 200
      }
    } catch (err: any) {
      console.error('Error uploading file:', err)
      return {
        data: "error",
        headers: {},
        status: err.status || 500
      }
    }
  }
}
