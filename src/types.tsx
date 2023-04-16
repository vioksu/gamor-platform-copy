export type CategoryType = {
  name: string
  slug: string,
}

export interface ICategoryStore {
  trendingCategories: CategoryType[]
}

export type UserType = {
  id: number;
  name: string
}

export interface IUserStore {
  users: UserType[],
  liveUsers: UserType[]
}

export type PlatformType = {
  id: number,
  name: string,
  active: Boolean
}

export interface IPlatformStore {
  platforms: PlatformType[]
}

export type GameType = {
  id: number,
  name: string,
  cover: {
    id: number,
    image_id: string,
    url: string
  },
  summary: string
}
