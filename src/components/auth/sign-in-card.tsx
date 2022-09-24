import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Input,
  Checkbox,
  CardFooter,
  Button,
  Alert
} from '@material-tailwind/react'
import { useRouter } from 'next/router'
import { ChangeEvent, SyntheticEvent, useState } from 'react'
import { Envelope, ExclamationOctagon, Lock } from 'react-bootstrap-icons'
import GoogleButton from 'react-google-button'
import toast from 'react-hot-toast'
import { useUserAuth } from 'context/UserAuthContext'

export default function SignInCard() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { signIn, googleSignIn } = useUserAuth()
  const router = useRouter()

  const handleSubmit = async (event: SyntheticEvent): Promise<void> => {
    event.preventDefault()
    setError('')
    try {
      await signIn(email, password)
      toast.success('Welcome, thanks for signing in!')
      router.push('/')
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setError('')
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    setError('')
  }

  const handleGoogleSignIn = async () => {
    setError('')
    try {
      await googleSignIn()
      toast.success('Welcome, thanks for signing in!')
      router.push('/')
    } catch (err) {
      toast.error('Could not login with Google!')
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-96 dark:bg-secondary">
        <CardHeader
          variant="gradient"
          color="blue-gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign in
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 dark:text-gray-300">
          <Typography>
            Thank you for your interest, sign-in works but features for users
            are still under construction, there&apos;s not much you can do after
            signing in.
          </Typography>
          {error && (
            <Alert color="red" icon={<ExclamationOctagon />}>
              {error}
            </Alert>
          )}
          <Input
            className="dark:text-gray-300"
            color="orange"
            icon={<Envelope />}
            label="Email"
            size="lg"
            onChange={handleEmailChange}
          />
          <Input
            className="dark:text-gray-300"
            color="orange"
            icon={<Lock />}
            label="Password"
            onChange={handlePasswordChange}
            size="lg"
            type="password"
          />
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" color="orange" type="submit" fullWidth>
            Sign In
          </Button>
        </CardFooter>
        <CardFooter divider>
          <GoogleButton
            className="w-full"
            style={{ width: '100%' }}
            onClick={handleGoogleSignIn}
          />
        </CardFooter>
      </Card>
    </form>
  )
}
