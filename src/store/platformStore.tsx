import { Store } from 'pullstate'
import { IPlatformStore } from '../types'

export const PlatformStore = new Store<IPlatformStore>({
  platforms: [
    { id: 1, name: 'Party', active: true },
    { id: 2, name: 'Matchs', active: false },
    { id: 3, name: 'Streams', active: false },
  ]
})
