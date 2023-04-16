import { Store } from 'pullstate'
import { IUserStore } from '../types'

export const UserStore = new Store<IUserStore>({
  users: [
    { id: 1, name: 'Dr Team' },
    { id: 2, name: 'Mia Plays' },
    { id: 3, name: 'Keoxer' },
    { id: 4, name: 'Nickmerc' },
    { id: 5, name: 'Poncho' },
    { id: 6, name: 'Blast' },
  ],
  liveUsers: [
    { id: 1, name: 'Dr Team' },
    { id: 2, name: 'Mia Plays' },
  ]
})
