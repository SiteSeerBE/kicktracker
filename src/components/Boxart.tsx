import { initializeApp } from 'firebase/app'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import Image from 'next/image'
import { useState } from 'react'

const Boxart = () => {
  const [boxartUrl, setBoxartUrl] = useState<string>('/images/no-image.jpg')

  const storage = getStorage()
  getDownloadURL(ref(storage, 'kickstarter/ks-1054742299.jpg'))
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
