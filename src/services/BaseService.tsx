import axios, { AxiosInstance } from "axios";

class BaseService {
  client: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_TWILIO_API_URL,
    headers: {
      'Content-Type': 'text/plain',
      'Client-ID': import.meta.env.VITE_TWITCH_CLIENT_ID,
      'Authorization': 'Bearer ' + import.meta.env.VITE_TWITCH_AUTHORIZATION,
      'Access-Control-Allow-Headers': 'Content-Type,Authorization',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, PUT, PATCH, GET, DELETE, OPTIONS',
      'Access-Control-Allow-Credentials': true,
    }
  })

  moduleURL = "";

  constructor(moduleURL: string) {
    this.moduleURL = moduleURL;
  }

  protected async getWithFilter(filter: string | null) {
    return new Promise(async(resolve, reject) => {
      const query = `fields name,summary,cover.url,slug,total_rating,total_rating_count; search "${filter}";`

      try {
        const {data} = await this.client.post(this.moduleURL, query)
        resolve(data.response)
      } catch (error) {
        reject(error)
      }
    })
  }
}

export { BaseService };
