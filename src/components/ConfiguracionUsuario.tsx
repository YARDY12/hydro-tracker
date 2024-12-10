import { useState } from 'react'
import { saveUserConfig } from '../utils/storage'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

interface ConfiguracionUsuarioProps {
  onConfigComplete: () => void
}

export default function ConfiguracionUsuario({ onConfigComplete }: ConfiguracionUsuarioProps) {
  const [dailyGoal, setDailyGoal] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (dailyGoal) {
      saveUserConfig({ dailyGoal: parseFloat(dailyGoal) })
      onConfigComplete()
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Configuración de Meta Diaria</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dailyGoal">Meta diaria de agua (litros)</Label>
            <Input
              id="dailyGoal"
              type="number"
              step="0.1"
              min="0"
              value={dailyGoal}
              onChange={(e) => setDailyGoal(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">Guardar Configuración</Button>
        </form>
      </CardContent>
    </Card>
  )
}

