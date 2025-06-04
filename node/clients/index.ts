import { IOClients } from '@vtex/api'

import Status from './status'
import Test from './test'
import DataEntities from './dataEntities'

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
}
