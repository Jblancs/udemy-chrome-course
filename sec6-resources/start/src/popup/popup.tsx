import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Box, Grid, InputBase, Paper, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import PictureInPictureIcon from '@mui/icons-material/PictureInPicture'
import 'fontsource-roboto'
import './popup.css'
import WeatherCard from '../components/WeatherCard'
import {
  setStoredCities,
  getStoredCities,
  setStoredOptions,
  getStoredOptions,
  LocalStorageOptions,
} from '../utils/storage'
import { Messages } from '../utils/messages'

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([])
  const [cityInput, setCityInput] = useState<string>('')
  const [options, setOptions] = useState<LocalStorageOptions | null>(null)

  useEffect(() => {
    getStoredCities().then((cities) => setCities(cities))
    getStoredOptions().then((options) => setOptions(options))
  }, [])

  // Helper Funct -------------------------------------------------------------------
  const handleCityBtnClick = () => {
    if (cityInput === '') {
      return
    }

    const updatedCities = [...cities, cityInput]
    setStoredCities(updatedCities).then(() => {
      setCities([...cities, cityInput])
      setCityInput('')
    })
  }

  const handleCityDeleteButtonClick = (index: number) => {
    cities.splice(index, 1)
    const updatedCities = [...cities]
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities)
    })
  }

  const handleTempScaleButtonClick = () => {
    const updatedOptions: LocalStorageOptions = {
      ...options,
      tempScale: options.tempScale === 'metric' ? 'imperial' : 'metric',
    }
    setStoredOptions(updatedOptions).then(() => {
      setOptions(updatedOptions)
    })
  }

  const handleOverlayButton = async () => {
    let queryOptions = { active: true, lastFocusedWindow: true }
    const [tab] = await chrome.tabs.query(queryOptions)
    if (tab) {
      const res = await chrome.tabs.sendMessage(tab.id, Messages.TOGGLE_OVERLAY)
    }
  }

  // if statement ------------------------------------------------------------------
  if (!options) {
    return null
  }

  // JSX ---------------------------------------------------------------------------
  return (
    <Box mx="8px" my="16px">
      <Grid container justifyContent="space-evenly">
        <Grid item>
          <Paper>
            <Box mx="15px" my="5px">
              <InputBase
                placeholder="Add a city name"
                value={cityInput}
                onChange={(event) => setCityInput(event.target.value)}
              />
              <IconButton onClick={handleCityBtnClick}>
                <AddIcon />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
        <Grid item>
          <Paper>
            <Box>
              <IconButton onClick={handleOverlayButton}>
                <PictureInPictureIcon />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
        <Grid item>
          <Paper>
            <Box>
              <IconButton onClick={handleTempScaleButtonClick}>
                {options.tempScale === 'metric' ? '\u2103' : '\u2109'}
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {options.homeCity != '' && (
        <WeatherCard city={options.homeCity} tempScale={options.tempScale} />
      )}
      {cities.map((city, index) => (
        <WeatherCard
          city={city}
          tempScale={options.tempScale}
          key={index}
          onDelete={() => handleCityDeleteButtonClick(index)}
        />
      ))}
      <Box height="16px" />
    </Box>
  )
}

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container!)
root.render(<App />)
