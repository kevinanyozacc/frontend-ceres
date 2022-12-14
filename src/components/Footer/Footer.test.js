import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Footer from '.'

test('footer rendering', () => {
  render(<Footer />)
  expect(screen.getByText(/senasa/i)).toBeInTheDocument()
})
