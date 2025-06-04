import type { IOResponse, InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'
import { VTEX_APP_KEY, VTEX_APP_TOKEN } from '../config'

export default class DataEntities extends ExternalClient {
    constructor(context: IOContext, options?: InstanceOptions) {
        super(`http://trika.vtexcommercestable.com.br`, context, {
            ...options,
            headers: {
                ...options?.headers,
                'X-VTEX-API-AppKey': VTEX_APP_KEY,
                'X-VTEX-API-AppToken': VTEX_APP_TOKEN,
                'Content-Type': 'application/json',
                'X-VTEX-Use-Https': 'true'
            }
        })
    }

    public async getDataEntities(start: number = 0, end: number = 10): Promise<IOResponse<string>> {
        const dataEntities = await this.http.get('/api/dataentities/NC/search', {
            params: {
                _fields: '_all'
            },
            headers: {
                'REST-Range': `resources=${start}-${end}`
            }
        })
        return dataEntities
    }

    public async getDataEntitiesWithHeaders(start: number = 0, end: number = 10): Promise<IOResponse<string>> {
        const response =  await this.http.getRaw('/api/dataentities/NC/search', {
            params: {
                _fields: '_all'
            },
            headers: {
                'REST-Range': `resources=${start}-${end}`
            }
        })
        return response.data
    }
}