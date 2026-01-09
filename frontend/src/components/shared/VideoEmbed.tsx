'use client'
import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player/lazy'

export default function VideoEmbed({ url }: { url?: string }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      {url && isClient ? (
        <ReactPlayer
          className="absolute inset-0"
          width={'100%'}
          height={'100%'}
          url={url}
          controls={true}
        />
      ) : null}
    </>
  )
}
