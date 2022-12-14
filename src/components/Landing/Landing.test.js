import { screen, render } from '@testing-library/react'
import Landing from './Landing'

test('search renders', () => {
  render(<Landing />)
  expect(screen.getByText(/busqueda/i)).toBeInTheDocument()
})
