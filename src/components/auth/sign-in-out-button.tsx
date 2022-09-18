import { User } from 'firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { BoxArrowInRight, BoxArrowRight } from 'react-bootstrap-icons'
import toast from 'react-hot-toast'
import { useUserAuth } from 'context/UserAuthContext'

type Props = {
  user: User | null
}

export function SignInOutButton(props: Props) {
  const { signOut } = useUserAuth()
  const router = useRouter()
  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success('Goodbye, you have signed out!')
      router.push('/')
    } catch (err) {}
  }
  if (props.user == null) {
    return (
      <div className="flex w-full cursor-pointer items-center overflow-hidden whitespace-nowrap rounded p-2 text-white hover:bg-blue-gray-400">
        <Link href="/sign-in">
          <a className="flex h-full w-full items-center">
            <div>
              <BoxArrowInRight size={30} />
            </div>
            <span className="ml-2 mt-2 text-2xl text-white">Sign in</span>
          </a>
        </Link>
      </div>
    )
  }
  return (
    <div className="flex w-full cursor-pointer items-center overflow-hidden whitespace-nowrap rounded p-2 text-white hover:bg-blue-gray-400">
      <a className="flex h-full w-full items-center" onClick={handleSignOut}>
        <div>
          <BoxArrowRight size={30} />
        </div>
        <span className="ml-2 mt-2 text-2xl text-white">Sign out</span>
      </a>
    </div>
  )
}
