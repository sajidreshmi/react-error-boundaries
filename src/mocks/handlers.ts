import {rest} from 'msw'
import {Circuit} from '../circuits'

interface GetCircuitResponseError {
  message: string
}

type GetCircuitResponse = Circuit | GetCircuitResponseError

interface GetCircuitParams {
  name: string
}

export const handlers = [
  rest.get<{}, GetCircuitResponse, GetCircuitParams>(
    'https://api.backend.com/circuits/:name',
    (req, res, ctx) => {
      if (Math.random() > 0.9) {
        return res(
          ctx.delay(1500),
          ctx.status(500),
          ctx.json({
            message: 'Service is currently unavailable. Please try again.',
          }),
        )
      }

      const circuit = allCircuits.find(
        circuit => circuit.name.toLowerCase() === req.params.name,
      )
      if (circuit) {
        return res(ctx.delay(1500), ctx.status(200), ctx.json({...circuit}))
      } else {
        const randomCircuit =
          allCircuits[Math.floor(allCircuits.length * Math.random())]
        return res(
          ctx.delay(1500),
          ctx.status(404),
          ctx.json({
            message: `Cannot find circuit: "${req.params.name}". Try "${randomCircuit.name}"`,
          }),
        )
      }
    },
  ),
]

const allCircuits: Circuit[] = [
  {
    name: 'Interlagos',
    location: 'Brasil',
    officialName: 'Autódromo Internacional Nelson Piquet',
    image: '/img/interlagos.png',
    firstGP: '1973',
    lapLength: 4309,
    laps: 71,
    totalLength: 305909,
    lapRecord: {
      time: '1:10.540',
      driver: 'Valteri Bottas',
      year: '2018',
    },
  },
  {
    name: 'Monza',
    location: 'Italy',
    officialName: 'Autodromo Nazionale Monza',
    image: '/img/monza.png',
    firstGP: '1950',
    lapLength: 5793,
    laps: 53,
    totalLength: 306720,
    lapRecord: {
      time: '1:21.046',
      driver: 'Rubens Barrichello',
      year: '2004',
    },
  },
  {
    name: 'Silverstone',
    location: 'Great Britain',
    officialName: 'Silverstone Circuit',
    image: '/img/silverstone.png',
    firstGP: '1950',
    lapLength: 5891,
    laps: 52,
    totalLength: 306198,
    lapRecord: {
      time: '1:27.097',
      driver: 'Max Verstappen',
      year: '2020',
    },
  },
  {
    name: 'Spa',
    location: 'Belgium',
    officialName: 'Circuit de Spa-Francorchamps',
    image: '/img/spa.png',
    firstGP: '1950',
    lapLength: 7004,
    laps: 44,
    totalLength: 308052,
    lapRecord: {
      time: '1:46.286',
      driver: 'Valteri Bottas',
      year: '2018',
    },
  },
]
