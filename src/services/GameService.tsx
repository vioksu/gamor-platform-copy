import { BaseService } from "./BaseService";

class GameService extends BaseService {

  constructor() {
    super('/games')
  }

  getGames(search: string | null): Promise<any> {
    const filter = search
    return this.getWithFilter(filter)
  }
}

const gameService = new GameService()
export { gameService }
