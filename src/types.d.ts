interface Creator {
  id: string
  name: string
}

interface Dates {
  end: Date
  start: Date
}

interface Game {
  creator: Creator
  dateAdded: Date
  dates: Dates
  id: string
  live?: boolean
  name: string
  platform: Platform
  short: Text
  urls: Urls
}

type Platform = 'kickstarter' | 'gamefound'

interface Urls {
  home: string
  localImage?: string
  remoteImage: string
  slug: string
}

interface Setting {
  counters: {
    numberOfGames: import('@google-cloud/firestore').FieldValue
  }
}
