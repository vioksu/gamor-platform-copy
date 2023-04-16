import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { PlatformType, UserType } from "../types"
import { MutableRefObject } from "react"

type PropsType = {
  platforms: PlatformType[],
  users: UserType[],
  onAddUser: (user: UserType) => void,
  onSelectPlatform: () => void
}

const SearchCard = ({ platforms, users, onAddUser, onSelectPlatform }: PropsType) => {
  const navigate = useNavigate()
  const gameInputRef = useRef() as MutableRefObject<HTMLInputElement>

  const handleSubmit = () => navigate(`/games/?q=${gameInputRef.current.value}`)

  return (
    <div className="search">
      <div className="search__platforms">
        <h3><span>01.</span> Choose Platform</h3>
        <div className="search__platforms--list space-outer-1">
          {platforms.map((p, index) => (
            <div
              key={`platform${index}`}
              className={p.active ? 'search__platforms--item active' : 'search__platforms--item'}
              onClick={() => onSelectPlatform(p)}
            >
              {p.name}
            </div>
          ))}
        </div>
      </div>
      <div className="search__games space-outer-3">
        <h3><span>02.</span> Searching game</h3>
        <form onSubmit={handleSubmit} className="search__games--card space-outer-1">
          <div className="search__games--input input space-inner-2">
            <input type="text" ref={gameInputRef} />
            <div className="search__games--icon f-icon-3">
              <svg width="100%" height="100%" viewBox="0 0 21 21"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M6.5 4a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V5a1 1 0 0 1 1-1zm12 2h-11m-2 0h-3m4 8a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zm12 2h-11m-2 0h-3m12-7a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zm-1 2h-11m16 0h-3"></path></svg>
            </div>
          </div>
          <div className="search__games--list space-outer-1 space-inner-2">
            {users.map((user, index) => (
              <div key={`user${index}`} className="search__games--item">
                <span className="search__games--item__id">{user.id}</span>
                <span className="search__games--item__name">{user.name}</span>
                <div className="search__games--item__icon f-icon-2" onClick={() => onAddUser(user)}>
                  <svg width="100%" height="100%" viewBox="0 0 32 32"><path fill="currentColor" d="M17 15V8h-2v7H8v2h7v7h2v-7h7v-2z"></path></svg>
                </div>
              </div>
            ))}
          </div>
          <div className="search__games--blur"></div>
          <div className="space-inner-2">
            <button type="submit" className="cta square">Search Now</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SearchCard
