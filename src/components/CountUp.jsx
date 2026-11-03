import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'

export default function CountUp({ value, prefix = '', suffix = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const reduceMotion = useReducedMotion()
  const [count, setCount] = useState(reduceMotion ? value : 0)

  useEffect(() => {
    if (!isInView) return undefined
    if (reduceMotion) {
      setCount(value)
      return undefined
    }
    const controls = animate(0, value, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (latest) => setCount(Math.round(latest)),
    })
    return () => controls.stop()
  }, [isInView, reduceMotion, value])

  return <span className="count-up" ref={ref}>{prefix}{count}<span className="count-suffix">{suffix}</span></span>
}
