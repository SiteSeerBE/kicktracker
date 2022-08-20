import { ref } from 'firebase/storage'
import Image from 'next/image'
import { useDownloadURL } from 'react-firebase-hooks/storage'
import { storage } from 'utils/firebase'

type Props = {
  localImage?: string
}

const Boxart = (props: Props) => {
  const [downloadUrl, loading, error] = useDownloadURL(
    ref(storage, props.localImage)
  )

  return (
    <Image
      src={
        !error && !loading && downloadUrl ? downloadUrl : '/images/no-image.jpg'
      }
      alt="Vercel Logo"
      className="h-full w-full"
      layout="fill"
    />
  )
}

export default Boxart
