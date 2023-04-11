import React from 'react'
import {Circuit} from '../circuits'
import styles from '../styles/circuits.module.scss'

const CircuitDetails = ({circuit}: {circuit: Circuit}) => {
  return (
    <>
      <div className={styles.infoHeader}>
        <div>
          <strong>{circuit.location}</strong>
          <p>{circuit.officialName}</p>
        </div>
        <div>
          <p>First Grand Prix</p>
          <strong>{circuit.firstGP}</strong>
        </div>
      </div>
      <img src={circuit.image} alt={circuit.name} />
      <div className={styles.infoContent}>
        <div className={styles.row}>
          <div className={styles.card}>
            <p>Circuit length</p>
            <div>
              <strong>
                {new Intl.NumberFormat().format(circuit.lapLength)}
              </strong>
              <small>KM</small>
            </div>
          </div>
          <div className={styles.card}>
            <p>No. of laps</p>
            <div>
              <strong>{circuit.laps}</strong>
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.card}>
            <p>Race distance</p>
            <div>
              <strong>
                {new Intl.NumberFormat().format(circuit.totalLength)}
              </strong>
              <small>KM</small>
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.card}>
            <p>Lap record</p>
            <div>
              <strong>{circuit.lapRecord.time}</strong>
              <small>{`${circuit.lapRecord.driver} (${circuit.lapRecord.year})`}</small>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CircuitDetails
