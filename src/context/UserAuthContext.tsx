import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  User,
  UserCredential
} from 'firebase/auth'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react'
import { auth } from 'utils/firebase'

type DefaultValues = {
  user: User | null
  isAdmin: boolean
  signIn: (email: string, password: string) => Promise<UserCredential>
  signUp: (email: string, password: string) => Promise<UserCredential>
  googleSignIn: () => Promise<UserCredential>
  signOut: () => Promise<void>
}

const defaultValues: DefaultValues = {
  user: null,
  isAdmin: false,
  signUp: (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
  },
  signIn: (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
  },
  googleSignIn: () => {
    const googleAuthProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleAuthProvider)
  },
  signOut: () => {
    return firebaseSignOut(auth)
  }
}

const userAuthContext = createContext(defaultValues)

export function UserAuthContextProvider(props: PropsWithChildren<any>) {
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  function signUp(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleAuthProvider)
  }

  function signOut(): Promise<void> {
    setUser(null)
    setIsAdmin(false)
    return firebaseSignOut(auth)
  }

  async function setClaims(user: User) {
    const idTokenResult = await user.getIdTokenResult(true)
    setIsAdmin(!!idTokenResult.claims.bgAdmin)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        setClaims(currentUser)
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])
  return (
    <userAuthContext.Provider
      value={{ user, isAdmin, signUp, signIn, googleSignIn, signOut }}
    >
      {props.children}
    </userAuthContext.Provider>
  )
}

export function useUserAuth() {
  return useContext(userAuthContext)
}
