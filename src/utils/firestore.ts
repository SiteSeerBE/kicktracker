// This Gist is part of a medium article - read here:
// https://jamiecurnow.medium.com/using-firestore-with-typescript-65bd2a602945

// import firstore (obviously)
import { collection, QueryDocumentSnapshot } from 'firebase/firestore'

const converter = <T>() => ({
  toFirestore: (data: Partial<T>) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T
})

const dataPoint = <T>(collectionPath: string) =>
  collection(db, collectionPath).withConverter(converter<T>())

const db = {
  // list your collections here
  games: dataPoint<Game>('games'),
  settings: dataPoint<Setting>('settings')
}

export { db }
export default db
