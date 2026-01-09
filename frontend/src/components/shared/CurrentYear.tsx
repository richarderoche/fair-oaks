'use client'
import { useEffect, useState } from 'react'

type Format = 'yyyy' | 'yy'

export default function CurrentYear(props: { format?: Format }) {
  const { format = 'yyyy' } = props
  const [currentYear, setCurrentYear] = useState('2025')
  useEffect(() => {
    const year = new Date().getFullYear().toString()
    if (format === 'yy') {
      setCurrentYear(year.slice(-2))
    } else {
      setCurrentYear(year)
    }
  }, [format, setCurrentYear])
  return <>{currentYear}</>
}
