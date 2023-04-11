import axios from 'axios'
import {ChangeEvent, FormEvent, useEffect, useState} from 'react'
import { Circuit } from './interface/Circuit'
import styles from './styles/circuits.module.scss'


const api = axios.create({baseURL: 'https://api.backend.com'})
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response.data.message) {
      error.message = error.response.data.message
    }
    return Promise.reject(error)
  },
)

export function fetchCircuit(name: string) {
  return api
    .get<Circuit>(`/circuits/${name.toLowerCase()}`)
    .then(res => res.data)
}

interface CircuitFormProps {
  onSubmit: (name: string) => void
  externalCircuitName: string
}

export function CircuitForm({onSubmit, externalCircuitName}: CircuitFormProps) {
  const [circuitName, setCircuitName] = useState(externalCircuitName)

  useEffect(() => {
    setCircuitName(externalCircuitName)
  }, [externalCircuitName])

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setCircuitName(e.target.value)
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onSubmit(circuitName)
  }

  function handleSelect(newCircuitName: string) {
    setCircuitName(newCircuitName)
    onSubmit(newCircuitName)
  }

  return (
    <form className={styles.circuitForm} onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="Circuit name..."
          value={circuitName}
          onChange={handleChange}
        />
        <button className={styles.primaryButton} type="submit">
          Submit
        </button>
      </div>
      <p>
        Try{' '}
        <button onClick={() => handleSelect('Interlagos')} type="button">
          “interlagos”
        </button>
        {', '}
        <button onClick={() => handleSelect('Monza')} type="button">
          “monza”
        </button>
        {', '}
        <button onClick={() => handleSelect('Spa')} type="button">
          “spa”
        </button>
        {'or '}
        <button onClick={() => handleSelect('Silverstone')} type="button">
          “silverstone”
        </button>
        {'.'}
      </p>
    </form>
  )
}
