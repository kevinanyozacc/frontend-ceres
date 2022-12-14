import { screen, render } from '@testing-library/react'
import LandingSearchBox from './LandingSearchBox'

test('search renders', () => {
  render(<LandingSearchBox />)
  expect(screen.getByText(/buscar/i)).toBeInTheDocument()
})
