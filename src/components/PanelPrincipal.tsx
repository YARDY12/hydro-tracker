// src/components/PanelPrincipal.jsx
import { useState, useEffect } from 'react';
import { getUserConfig, getWaterConsumption, saveWaterConsumption } from '../utils/storage';  // Corregido el nombre de la función 'getUserConfig'
import { UserConfig, WaterConsumption } from '../types';
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

export default function PanelPrincipal() {
  const [userConfig, setUserConfig] = useState<UserConfig | null>(null);  // Corregido 'setUser Config' a 'setUserConfig'
  const [consumption, setConsumption] = useState<WaterConsumption>({ total: 0, date: new Date().toDateString() });

  useEffect(() => {
    const config = getUserConfig();  // Corregido 'getUser Config' a 'getUserConfig'
    const savedConsumption = getWaterConsumption();
    
    if (config) setUserConfig(config);  // Corregido 'setUser Config' a 'setUserConfig'
    if (savedConsumption && savedConsumption.date === new Date().toDateString()) {
      setConsumption(savedConsumption);
    } else {
      setConsumption({ total: 0, date: new Date().toDateString() });
    }
  }, []);

  const addWater = (amount: number) => {
    const newTotal = consumption.total + amount;
    const newConsumption = { ...consumption, total: newTotal };
    setConsumption(newConsumption);
    saveWaterConsumption(newConsumption);
  };

  const progress = userConfig ? (consumption.total / (userConfig.dailyGoal * 1000)) * 100 : 0;

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-blue-800">Panel de Seguimiento</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">  {/* Corregido el valor de 'className' de 'space ```jsx -y-4' a 'space-y-4' */}
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">{consumption.total} ml</p>
          <p className="text-blue-500">de {userConfig?.dailyGoal ?? 0} L</p>
        </div>
        <Progress value={progress} className="w-full bg-blue-200" />
        <div className="flex justify-center space-x-4">
          <Button onClick={() => addWater(250)} className="bg-blue-300 hover:bg-blue-400">+250 ml</Button>
          <Button onClick={() => addWater(500)} className="bg-blue-300 hover:bg-blue-400">+500 ml</Button>
        </div>
        {progress >= 100 && (
          <p className="text-center text-green-600 font-bold">¡Meta alcanzada!</p>
        )}
      </CardContent>
    </Card>
  );
}
