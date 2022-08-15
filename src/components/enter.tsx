import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { Component, ReactComponentElement } from 'react'
import { useContext } from 'react'
import { toast } from 'react-hot-toast'
import { UserContext } from 'utils/context'
import { auth } from 'utils/firebase'

export default function Enter() {
  const user = useContext(UserContext)
  return <>{user ? <SignOutButton /> : <SignInButton />}</>
}

// Sign in with Google button

const googleProvider = new GoogleAuthProvider()

function SignInButton() {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider)
      .then((user) => {
        toast.success('Logged in with Google!')
      })
      .catch((error) => {
        console.log(error)
        toast.error('Login with Google failed!')
      })
  }

  return (
    <button
      className="dark:focus:ring-[#4285F4]/55 mr-2 mb-2 inline-flex items-center rounded-lg bg-[#4285F4] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#4285F4]/90 focus:outline-none focus:ring-4 focus:ring-[#4285F4]/50"
      onClick={signInWithGoogle}
      type="button"
    >
      <svg
        className="mr-2 -ml-1 h-4 w-4"
        aria-hidden="true"
        focusable="false"
        data-prefix="fab"
        data-icon="google"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 488 512"
      >
        <path
          fill="currentColor"
          d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
        ></path>
      </svg>
      Sign in with Google
    </button>
  )
}

// Sign out button
function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign Out</button>
}
