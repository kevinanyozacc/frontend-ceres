import { useEffect } from 'react';
import { useRef } from 'react'

function useFocusInput() {
  const ref = useRef()
  useEffect(() => ref.current?.focus(), [])
  return ref
}

export default useFocusInput