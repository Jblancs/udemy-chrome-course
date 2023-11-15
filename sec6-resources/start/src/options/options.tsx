import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  Box,
  Button,
  Switch
} from '@mui/material'
import 'fontsource-roboto'
import './options.css'
import {
  LocalStorageOptions,
  getStoredOptions,
  setStoredOptions,
} from '../utils/storage'

type FormState = 'ready' | 'saving'

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null)
  const [formState, setFormState] = useState<FormState>('ready')

  useEffect(() => {
    getStoredOptions().then((options) => setOptions(options))
  }, [])

  const handleHomeCityChange = (homeCity: string) => {
    console.log(homeCity)
    setOptions({
      ...options,
      homeCity,
    })
  }

  const handleAutoOverlayChange = ((hasAutoOverlay: boolean) => {
    setOptions({
      ...options,
      hasAutoOverlay
    })
  })

  const handleSaveButtonClick = () => {
    setFormState('saving')
    setStoredOptions(options).then(() => {
      setTimeout(() => {
        setFormState('ready')
      }, 1000)
    })
  }

  if (!options) {
    return null
  }

  const isFieldsDisabled = formState === 'saving'

  return (
    <Box mx="10%" my="2%">
      <Card>
        <CardContent>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <Typography variant="h4">Weather Extension Options</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">Auto Toggle Overlay</Typography>
              <Switch
                checked={options.hasAutoOverlay}
                onChange={(event, checked) => handleAutoOverlayChange(checked)}
                disabled={isFieldsDisabled}
              />
            </Grid>
            <Grid item>
              <Typography variant="body1">Home City Name</Typography>
              <TextField
                fullWidth
                placeholder="Enter a home city"
                value={options.homeCity}
                onChange={(event) => handleHomeCityChange(event.target.value)}
                disabled={isFieldsDisabled}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={handleSaveButtonClick}
                disabled={isFieldsDisabled}
              >
                {formState === 'ready' ? 'Save' : 'Saving...'}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container!)
root.render(<App />)
