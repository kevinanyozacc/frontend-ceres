import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import NavBar from './NavBar'

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, { wrapper: BrowserRouter })
}

test('header links render', () => {
  const route = '/'
  renderWithRouter(<NavBar />, { route })
  const expectedLinksTexts = [
    'acceso',
    'registrarse como productor',
  ]
  expectedLinksTexts.forEach(text => {
    const linkElement = screen.getByText(new RegExp(text, 'i'))
    expect(linkElement).toBeInTheDocument()
  })
})
