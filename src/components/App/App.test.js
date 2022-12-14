import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App'
import { MemoryRouter } from 'react-router'

test('app rendering', () => {
  render(<App />, { wrapper: MemoryRouter })
  expect(screen.getByText(/Plataforma de trazabilidad SENASA/i)).toBeInTheDocument()
})
