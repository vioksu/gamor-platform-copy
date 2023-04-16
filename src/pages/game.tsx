import { useLoaderData } from "react-router-dom"
import Games from '../data/games.json'
import NavigationOptions from "../components/NavigationOptions";

type PropsType = {
  params: { gameId: number }
}

export async function loader({ params }: PropsType) {
  const game = await Games.find(g => g.id == params.gameId)

  if (!game) {
    throw new Response("", {
      status: 404,
      statusText: "Not found"
    });
  }
  return { game }
}

const Game = () => {
  const { game } = useLoaderData()

  const coverBig = (img: string) => `${import.meta.env.VITE_TWITCH_IMG_BASE}/${game.cover.image_id}.jpg`

  return (
    <div>
      <div className="light-menu">
        <NavigationOptions menu='search' />
      </div>
      <div className="game space-outer-5">
        <img src={coverBig(game.cover.url)} alt={game.name} />
        <div>
          <h3 className="f-h3">{game.name}</h3>
          <p className="space-outer-2">{game.summary}</p>
        </div>
      </div>
    </div>
  )
}

export default Game
