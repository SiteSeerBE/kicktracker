import { Card, CardBody, Typography } from '@material-tailwind/react'
import Link from 'next/link'
import Header from 'components/Header'
import SignInCard from 'components/auth/sign-in-card'

export default function SignIn() {
  return (
    <div className="ml-5 h-full">
      <Header title="Sign in" />
      <main className="flex h-full flex-col items-center justify-center gap-3">
        <SignInCard />
        <Card className="w-96 dark:bg-secondary">
          <CardBody className="dark:text-gray-300">
            <Typography variant="small" className="flex justify-center">
              Don&apos;t have an account?
              <Link href="/sign-up" passHref>
                <Typography
                  as="a"
                  variant="small"
                  color="orange"
                  className="ml-1 cursor-pointer font-bold"
                >
                  Sign up
                </Typography>
              </Link>
            </Typography>
          </CardBody>
        </Card>
      </main>
    </div>
  )
}
