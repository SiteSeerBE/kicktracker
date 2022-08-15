import { ref, getDownloadURL } from 'firebase/storage'
import Image from 'next/image'
import { useState } from 'react'
import { storage } from 'utils/firebase'

type Props = {
  localImage: string
}

const Boxart = (props: Props) => {
  const [boxartUrl, setBoxartUrl] = useState<string>('/images/no-image.jpg')

  getDownloadURL(ref(storage, props.localImage))
    .then((url) => {
      setBoxartUrl(url)
    })
    .catch((error) => {
      console.log(error)
    })

  return (
    <Image
      src={boxartUrl}
      alt="Vercel Logo"
      className="ml-2 h-4"
      width={100}
      height={100}
    />
  )
}

export default Boxart
