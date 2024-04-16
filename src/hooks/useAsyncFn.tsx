import { useState } from 'react'

/**
 * Launch any asynchronous function and return state, result
 * @param fn any asynchronous function
 */
export default function useAsyncFn<T>(fn: () => Promise<T>) {
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [result, setResult] = useState<T>(undefined)

  const trigger = () => {
    setIsProcessing(true)
    fn()
      .then((r) => {
        setResult(r)
        setIsSuccess(true)
      })
      .catch(() => setIsError(true))
      .finally(() => setIsProcessing(false))
  }

  return { isProcessing, isError, isSuccess, trigger, result }
}
