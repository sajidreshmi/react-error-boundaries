import {useState} from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import CircuitContent from './circuits/CircuitContent'

import CircuitErrorFallback from './circuits/CircuitErrorFallback'
import CircuitForm from './circuits/CircuitForm'
import './styles/global.scss'
import styles from './styles/home.module.scss'


function App() {
  const [circuitName, setCircuitName] = useState('')

  const handleSubmit = (circuitName: string)=> {
    setCircuitName(circuitName)
  }

  const handleReset = () => {
    setCircuitName('')
  }

  return (
    <div>
      <div className={styles.header}>
        <h1>Circuits</h1>
      </div>
      <div className={styles.container}>
        <CircuitForm
          onSubmit={handleSubmit}
          externalCircuitName={circuitName}
        />
        <div className={styles.contentWrapper}>
          <ErrorBoundary
            onReset={handleReset}
            resetKeys={[circuitName]}
            FallbackComponent={CircuitErrorFallback}
          >
            <CircuitContent circuitName={circuitName} />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  )
}

export default App
