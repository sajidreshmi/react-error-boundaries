import React from 'react'
import {FallbackProps} from 'react-error-boundary'
import styles from '../styles/circuits.module.scss'

const CircuitErrorFallback = ({error, resetErrorBoundary}: FallbackProps) => {
  return (
    <div role="alert" className={styles.errorContainer}>
      <h3>Something went wrong...</h3>
      <p>{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className={`${styles.primaryButton} ${styles.redButton}`}
      >
        Try again
      </button>
    </div>
  )
}

export default CircuitErrorFallback
