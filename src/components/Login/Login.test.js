import { screen, render } from '@testing-library/react'
import Login from './Login'

test('login renders', () => {
  render(<Login />)
  expect(screen.getByText(/e-mail/i)).toBeInTheDocument()
})
