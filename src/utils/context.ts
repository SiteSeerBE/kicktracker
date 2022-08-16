import { User } from 'firebase/auth'
import { createContext } from 'react'

type userContext = {
  user: User | null | undefined
}

export const UserContext = createContext<userContext>({ user: undefined })
