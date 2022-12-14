import { screen, render } from '@testing-library/react'
import Register from './Register'

test('register renders', () => {
  render(<Register />)
  expect(screen.getByText(/e-mail/i)).toBeInTheDocument()
})
