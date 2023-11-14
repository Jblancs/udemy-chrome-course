const OPEN_WEATHER_API_KEY = 'a215035b17b38f02f434ac7f137d349f'

// interface defines type on multiple object fields (ex. object from API)
// copy important fields in API object
export interface OpenWeatherData {
    name: string
    main: {
        feels_like: number
        humidity: number
        pressure: number
        temp: number
        temp_max: number
        temp_min: number
    }
    weather: {
        description: string
        icon: string
        id: number
        main: string
    } []
    wind: {
        speed: number
        deg: number
    }
}
// weather key is an array of objects

export async function fetchOpenWeatherData(city: string): Promise<OpenWeatherData> {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPEN_WEATHER_API_KEY}`
  )

  //   throw error if res not valid
  if (!res.ok) {
    throw new Error('City not found')
  }

  const data: OpenWeatherData = await res.json()
  return data
}
