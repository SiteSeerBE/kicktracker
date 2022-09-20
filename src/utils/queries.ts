import { getDocs, limit, query, where } from 'firebase/firestore'
import { gamesCol } from './firebase'

export const getGamesForRating = async () => {
  const q = query(
    gamesCol,
    where('live', '==', true),
    where('tags', 'array-contains', 'none'),
    limit(30)
  )

  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => doc.data())
}
