import { useEffect, useRef, useState } from 'react'

type Options = {
  root: null
  rootMargin: string
  threshold: number
}

const useElementOnScreen = (options: Options) => {
  const containerRef = useRef<HTMLButtonElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const callbackFunction = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries
    setIsVisible(entry.isIntersecting)
  }
  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options)
    if (containerRef.current) observer.observe(containerRef.current)
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (containerRef.current) observer.unobserve(containerRef.current)
    }
  }, [containerRef, options])
  return { containerRef, isVisible }
}

export default useElementOnScreen
