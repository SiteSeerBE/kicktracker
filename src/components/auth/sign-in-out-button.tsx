import { User } from 'firebase/auth'
import { useRouter } from 'next/router'

import { BoxArrowInRight, BoxArrowRight } from 'react-bootstrap-icons'
import toast from 'react-hot-toast'
import SideBarIcon from 'components/side-bar-icon'
import { useUserAuth } from 'context/UserAuthContext'

type Props = {
  menuClosed: boolean
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
  return (
    <>
      <SideBarIcon
        active={['/sign-in', '/sing-up'].includes(router.route)}
        icon={
          props.user ? (
            <BoxArrowRight size={36} />
          ) : (
            <BoxArrowInRight size={36} />
          )
        }
        onClick={props.user ? handleSignOut : () => {}}
        tooltip={
          props.menuClosed ? (props.user ? 'Sign out' : 'Sing in') : undefined
        }
      />
      {!props.menuClosed && (
        <span className="ml-4 grow text-lg">
          {props.user ? 'Sign out' : 'Sign in'}
        </span>
      )}
    </>
  )
}
