import Head from 'next/head'
import toast from 'react-hot-toast'
import Loader from 'components/Loader'
import Enter from 'components/enter'

export default function Components() {
  return (
    <div className="ml-5">
      <Head>
        <title>Demo page for all components</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <h1 className="heading1">Loader</h1>
          <p className="paragraphNormal">Loading spinner</p>
          <Loader show={true} />
        </div>
        <div>
          <h1 className="heading1">Toast</h1>
          <p className="paragraphNormal">
            Component for sending toast messages
          </p>
          <div>
            <button onClick={() => toast.success('hello toast!')}>
              Toast Me
            </button>
          </div>
        </div>
        <div>
          <h1 className="heading1">Sign in / Sign out</h1>
          <p className="paragraphNormal">
            Get the user to Sign in / Sign out with Google
          </p>
          <Enter />
        </div>
      </main>
    </div>
  )
}
