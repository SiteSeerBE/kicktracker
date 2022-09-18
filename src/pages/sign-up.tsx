import { Card, CardBody, Typography } from '@material-tailwind/react'
import Head from 'next/head'
import Link from 'next/link'
import SignUpCard from 'components/auth/sign-up-card'

export default function SignUp() {
  return (
    <div className="ml-5 h-full">
      <Head>
        <title>Sign in | Kicktracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-full flex-col items-center justify-center gap-3">
        <SignUpCard />
        <Card className="w-96">
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
