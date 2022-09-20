import { Alert } from '@material-tailwind/react'
import { PropsWithChildren } from 'react'
import { useUserAuth } from 'context/UserAuthContext'

interface Props extends PropsWithChildren<any> {}

export default function Authentication(props: PropsWithChildren<any>) {
  const { isAdmin } = useUserAuth()
  if (props.pageProps.protected && !isAdmin) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <Alert className="w-1/2">Sorry, you don&apos;t have access.</Alert>
      </div>
    )
  }
  return <>{props.children}</>
}
