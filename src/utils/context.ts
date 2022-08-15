import { createContext } from 'react'

type userContext = {
  user: string | undefined
}

export const UserContext = createContext<userContext>({ user: undefined })
