import { setStoredCities, setStoredOptions } from "../utils/storage"


// set default value for local storage on install
// example: cities needs to be an array. If no default value, mapping a null value will cause an error.
chrome.runtime.onInstalled.addListener(() => {
  setStoredCities([])
  setStoredOptions({
    // not option so must include (did not use ? on temp scale in LocalStorageOptions)
    homeCity: '',
    tempScale: 'metric'
  })
})
