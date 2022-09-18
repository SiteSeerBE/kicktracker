import {
  Card,
  CardHeader,
  Typography,
  Input,
  Button,
  CardBody,
  CardFooter,
  Alert
} from '@material-tailwind/react'
import { useRouter } from 'next/router'
import { ChangeEvent, SyntheticEvent, useState } from 'react'
import { Envelope, ExclamationOctagon, Lock } from 'react-bootstrap-icons'
import toast from 'react-hot-toast'
import { useUserAuth } from 'context/UserAuthContext'

export default function SignUpCard() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { signUp } = useUserAuth()
  const router = useRouter()

  const handleSubmit = async (event: SyntheticEvent): Promise<void> => {
    event.preventDefault()
    setError('')
    try {
      await signUp(email, password)
      toast.success('You have signed up and can now sign in!')
      router.push('/sign-in')
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

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="blue-gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign up
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Typography>
            Thank you for your interest, sign-up works but features for users
            are still under construction, there&apos;s not much you can do after
            signing up.
          </Typography>
          {error && (
            <Alert color="red" icon={<ExclamationOctagon />}>
              {error}
            </Alert>
          )}
          <Input
            color="orange"
            icon={<Envelope />}
            label="Email"
            onChange={handleEmailChange}
            size="lg"
          />
          <Input
            color="orange"
            icon={<Lock />}
            label="Password"
            onChange={handlePasswordChange}
            size="lg"
            type="password"
          />
        </CardBody>
        <CardFooter className="pt-0">
          <Button type="submit" variant="gradient" color="orange" fullWidth>
            Sign up
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
