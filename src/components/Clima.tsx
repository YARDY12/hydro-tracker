import { useState, useEffect } from 'react'
import { WeatherData } from '../types'
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

export default function Clima() {
  const [weather, setWeather] = useState<WeatherData | null>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Madrid&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`)
        const data = await res.json()
        setWeather({
          temperature: data.main.temp,
          description: data.weather[0].description
        })
      } catch (error) {
        console.error('Error fetching weather data:', error)
      }
    }

    fetchWeather()
  }, [])

  if (!weather) return null

  return (
    <Card className="w-full max-w-md mx-auto mt-4">
      <CardHeader>
        <CardTitle>Clima Actual</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Temperatura: {weather.temperature}°C</p>
        <p>Descripción: {weather.description}</p>
      </CardContent>
    </Card>
  )
}

