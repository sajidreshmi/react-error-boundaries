import React, { useEffect, useState } from 'react'
import { Circuit } from '../interface/Circuit'
import { fetchCircuit } from '../service/service'
import CircuitDetails from './CircuitDetails'
import CircuitIdle from './CircuitIdle'
import CircuitLoading from './CircuitLoading'

const CircuitContent = ({circuitName}: {circuitName: string}) => {
    const [state, setState] = useState<{
        status: 'idle' | 'pending' | 'resolved' | 'rejected'
        circuit: Circuit
        error: Error | null
      }>({
        status: 'idle',
        circuit: {} as Circuit,
        error: null,
      })
      const {status, circuit, error} = state
    
      useEffect(() => {
        if (!circuitName) {
          return
        }
        setState(prevState => ({...prevState, status: 'pending'}))
        fetchCircuit(circuitName).then(
          circuit => {
            setState(prevState => ({...prevState, status: 'resolved', circuit}))
          },
          error => {
            setState(prevState => ({...prevState, status: 'rejected', error}))
          },
        )
      }, [circuitName])
    
      if (status === 'idle') {
        return <CircuitIdle />
      } else if (status === 'pending') {
        return <CircuitLoading />
      } else if (status === 'rejected') {
        // throw error to be handled by error boundary
        throw error
      } else if (status === 'resolved') {
        return <CircuitDetails circuit={circuit} />
      }
    
      throw new Error('Something went really wrong.')
}

export default CircuitContent