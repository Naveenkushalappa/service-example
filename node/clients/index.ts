import { IOClients } from '@vtex/api'

import Status from './status'
import Test from './test'
import DataEntities from './dataEntities'
import UploadFile from './uploadFileClient'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get status() {
    return this.getOrSet('status', Status)
  }

  public get test() {
    return this.getOrSet('test', Test)
  }

  public get dataEntities() {
    return this.getOrSet('dataEntities', DataEntities)
  }
  public get uploadFileClient() {
    return this.getOrSet('uploadFileClient', UploadFile)
  }
}
