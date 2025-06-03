import type { IOResponse, InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class Test extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('', context, options)
  }
  
  public async getTest(): Promise<IOResponse<string>> {
    return {
        data: 'test',
        headers: {},
        status: 200,
    }
  }

  public async getTestWithHeaders(): Promise<IOResponse<string>> {
    return {
      data: 'test',
      headers: {},
      status: 200,
    }
  }
}