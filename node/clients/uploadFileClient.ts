import { IOClient, IOContext, InstanceOptions, IOResponse } from '@vtex/api'
import { VTEX_APP_KEY, VTEX_APP_TOKEN } from '../config'
import * as fs from 'fs'

export default class UploadFile extends IOClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, options)
  }

  public async uploadFileWithHeaders(
    file: string | Blob,
    documentId: string
  ): Promise<IOResponse<string>> {
    const headers = {
      'Accept': 'application/json',
      'X-VTEX-API-AppKey': VTEX_APP_KEY,
      'X-VTEX-API-AppToken': VTEX_APP_TOKEN,
      'X-VTEX-Use-Https': 'true',
      'Content-Type': 'multipart/form-data'
    }

    try {
      let fileBuffer: Buffer
      if (typeof file === 'string') {
        // If file is a path string
        fileBuffer = fs.readFileSync(file)
      } else if (file instanceof Blob) {
        // If file is a Blob, convert to Buffer
        const arrayBuffer = await file.arrayBuffer()
        fileBuffer = Buffer.from(arrayBuffer)
      } else {
        throw new Error('Invalid file type')
      }

      const response = await this.http.postRaw(
        `/api/dataentities/NC/documents/${documentId}/fileLink/attachments`,
        fileBuffer,
        {
          headers,
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
