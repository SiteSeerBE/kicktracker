interface Creator {
  id: string
  name: string
}

interface Dates {
  end: number
  start: number
}

interface Game {
  creator: Creator
  dateAdded: import('@firebase/firestore').Timestamp
  dates: Dates
  id: string
  live?: boolean
  name: string
  platform: Platform
  short: Text
  tags: string[]
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
