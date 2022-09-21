import { User } from 'firebase/auth'
import { useRouter } from 'next/router'

import { BoxArrowInRight, BoxArrowRight } from 'react-bootstrap-icons'
import toast from 'react-hot-toast'
import SideBarIcon from 'components/side-bar-icon'
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
      <>
        <SideBarIcon
          icon={<BoxArrowInRight size={26} />}
          to="/sign-in"
          tooltip="Sign in"
        />
      </>
    )
  }
  return (
    <SideBarIcon
      icon={<BoxArrowInRight size={26} />}
      to={handleSignOut}
      tooltip="Sign out"
    />
  )
}
