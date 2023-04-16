import { Info } from "./Info"
import SearchCard from "./SearchCard"
import LiveStream from "./LiveStream"
import { useState } from "react"
import { UserType, PlatformType } from "../types"
import { UserStore } from "../store/userStore"
import { PlatformStore } from "../store/platformStore"

export default function Hero() {
  const users = UserStore.useState(c => c.users)
  const liveUsersStore = UserStore.useState(u => u.liveUsers)
  const platformsStore = PlatformStore.useState(p => p.platforms)

  const [liveUsers, setUsers] = useState(liveUsersStore)
  const [platforms, setPlatforms] = useState(platformsStore)

  const addUser = (newUser: UserType) => {
    if (liveUsers.findIndex(user => user.id === newUser.id) === -1)
      setUsers(users => [...users.slice(), newUser])
  }

  const selectPlatform = (platformSelected: PlatformType) => {

    // 1. Copy the platforms
    const newPlatforms = platforms.slice();

    // 2. Deactivate the current active platform
    const currentPlatformSelectedIndex = platforms.findIndex(p => p.active)
    newPlatforms[currentPlatformSelectedIndex].active = false;

    // 3. Find the platform with the provided id
    const platformSelectedIndex = platforms.findIndex(p => p.id === platformSelected.id)

    // 4. Mark the platform as active
    const updatedPlatform = { ...platforms[platformSelectedIndex], active: true }

    // 5. Update the platforms list with the updated platform
    newPlatforms[platformSelectedIndex] = updatedPlatform;

    setPlatforms(newPlatforms);
  }

  return (
    <main className='hero container'>
      <div className="hero__info">
        <Info />
      </div>
      <div className='hero__panel'>
        <LiveStream liveUsers={liveUsers} />
      </div>
      <div className="hero__search">
        <SearchCard
          platforms={platforms}
          users={users}
          onAddUser={addUser}
          onSelectPlatform={selectPlatform}
        />
      </div>
    </main>
  )
}
