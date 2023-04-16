import { useState, useEffect } from 'react'
import { Outlet, Link, NavLink, Form, redirect, useLoaderData, useNavigation, useSubmit } from "react-router-dom"
import { gameService } from '../services/GameService'
import Games from '../data/games.json'
// import { useDebounce } from '../hooks/useDebounce'

type PropsType = {
  request: { url: string }
}

export async function loader({ request }: PropsType) {
  const url = new URL(request.url)
  const q = url.searchParams.get('q')

  const games = q
    ? Games.filter(g => g.name.toLowerCase().includes(q))
    : Games

  return { games, q };
}

const searchGames = () => {
  const { games, q } = useLoaderData()
  const navigation = useNavigation()
  const submit = useSubmit()
  const [query, setQuery] = useState(q)

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has(
      "q"
    );

  useEffect(() => {
    setQuery(q)
  }, [q]);

  return (
    <div className='games'>
      <div id="sidebar">
        <Link to="/"><h1>Gamor Streaming Platform</h1></Link>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? "loading" : ""}
              aria-label="Search games"
              placeholder="Search"
              type="search"
              name="q"
              value={query}
              onChange={(event) => {
                const isFirstSearch = q == null
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch
                })
              }}
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={!searching}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </Form>
        </div>
        <nav>
          <ul>
            {games.length ? (
              <ul>
                {games.map((game) => (
                  <li key={`game${game.id}`}>
                    <NavLink
                      to={`${game.id}`}
                      className={({ isActive, isPending }) =>
                        isActive
                          ? "active"
                          : isPending
                          ? "pending"
                          : ""
                      }
                    >
                      {game.name ? (
                        <>
                          {game.name}
                        </>
                      ) : (
                        <i>No Name</i>
                      )}{" "}
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>No Games</i>
              </p>
            )}
          </ul>
        </nav>

        {/* <button type="button" onClick={handleLogout}>Logout</button> */}
      </div>
      <div
        id="detail"
        className={
          navigation.state === "loading" ? "loading" : ""
        }
      >
        <Outlet />
      </div>
    </div>
  )
}

export default searchGames
