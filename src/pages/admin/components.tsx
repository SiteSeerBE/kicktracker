import toast from 'react-hot-toast'
import Header from 'components/Header'
import Loader from 'components/Loader'

export default function Components() {
  return (
    <div className="ml-5">
      <Header title="Components" />
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
      </main>
    </div>
  )
}
