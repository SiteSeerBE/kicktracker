import { Card, CardBody, Typography } from '@material-tailwind/react'
import Link from 'next/link'
import Header from 'components/Header'
import SignUpCard from 'components/auth/sign-up-card'

export default function SignUp() {
  return (
    <div className="ml-5 h-full">
      <Header title="Sign up" />
      <main className="flex h-full flex-col items-center justify-center gap-3">
        <SignUpCard />
        <Card className="w-96 dark:bg-secondary dark:text-gray-300">
          <CardBody>
            <Typography variant="small" className="flex justify-center">
              Already have an account?
              <Link href="/sign-in" passHref>
                <Typography
                  as="a"
                  variant="small"
                  color="orange"
                  className="ml-1 cursor-pointer font-bold"
                >
                  Sign in
                </Typography>
              </Link>
            </Typography>
          </CardBody>
        </Card>
      </main>
    </div>
  )
}
