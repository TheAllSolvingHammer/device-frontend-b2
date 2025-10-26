import { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { Button } from './ui/button'

export function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('Counter mounted')

    return () => {
      console.log('Counter unmounted')
    }
  }, [])

  useEffect(() => {
    console.log(`Count changed: ${count}`)
  }, [count])

  return (
    <Card className='w-full max-w-sm text-center'>
      <CardHeader>
        <h2 className='text-xl font-semibold'>Interactive Counter</h2>
      </CardHeader>
      <CardContent>
        <p className='text-muted-foreground mb-4'>
          Click the button to increase the count:
        </p>
        <Button size='lg' onClick={() => setCount((c) => c + 1)}>
          count is {count}
        </Button>
      </CardContent>
      <CardFooter className='flex justify-center'>
        <p className='text-xs text-muted-foreground'>
          Edit <code className='font-mono'>app/components/Counter.tsx</code> and
          save to test HMR
        </p>
      </CardFooter>
    </Card>
  )
}
