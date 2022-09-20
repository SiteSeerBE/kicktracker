import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
  collection,
  CollectionReference,
  DocumentData,
  getFirestore
} from 'firebase/firestore'
import { firebaseConfig } from './firebaseConfig'

const firebaseApp = initializeApp(firebaseConfig)

export const auth = getAuth(firebaseApp)
export const firestore = getFirestore(firebaseApp)

//Typescript stuff
const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(firestore, collectionName) as CollectionReference<T>
}
export const gamesCol = createCollection<Game>('games')
