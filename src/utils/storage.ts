import { UserConfig, WaterConsumption } from '../types'

export const saveUserConfig = (config: UserConfig): void => {
  localStorage.setItem('userConfig', JSON.stringify(config))
}

export const getUserConfig = (): UserConfig | null => {
  const config = localStorage.getItem('userConfig')
  return config ? JSON.parse(config) : null
}

export const saveWaterConsumption = (consumption: WaterConsumption): void => {
  localStorage.setItem('waterConsumption', JSON.stringify(consumption))
}

export const getWaterConsumption = (): WaterConsumption | null => {
  const consumption = localStorage.getItem('waterConsumption')
  return consumption ? JSON.parse(consumption) : null
}

