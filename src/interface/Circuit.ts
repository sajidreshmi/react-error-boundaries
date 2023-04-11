export interface Circuit {
  name: string
  location: string
  officialName: string
  image: string
  firstGP: string
  lapLength: number
  laps: number
  totalLength: number
  lapRecord: {
    time: string
    driver: string
    year: string
  }
}
