import Footer from '../Footer'
import Landing from '../Landing'
import NavBar from '../NavBar'
import { Routes, Route } from 'react-router-dom'
import Login from '../Login'
import './App.css'
import SearchResults from '../SearchResults'
import bigImage from '../../assets/images/hero1-compressed.jpg'
import heroFigure from '../../assets/images/hero_figure.svg'
import BreadCrumb from '../BreadCrumb'
import PlaceProfile from '../PlaceProfile'
import Drawer from '../Drawer'
import ReadCode from '../ReadCode'
import UsersManagement from '../UsersManagement'
import Register from '../Register'
import AnimalProfile from '../AnimalProfile'
import CenteredContainer from '../CenteredContainer'
import FarmProfile from '../FarmProfile'

const App = () => {
  return (
    <div className="App">
      <Drawer />
      <NavBar />
      <BreadCrumb />
      <Routes>
        <Route path="/acceso" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/usuarios/*" element={<UsersManagement />} />
        <Route path="/busqueda" element={<SearchResults />}>
          <Route path="lugar" />
          <Route path="animal" />
          <Route path="predio" />
        </Route>
        <Route path="/establecimiento/:type/:id" element={<PlaceProfile />} />
        <Route path="/animal/:id" element={<AnimalProfile />} />
        <Route path="/predio/:id" element={<FarmProfile />} />
        <Route path="/" element={<Landing />} />
        <Route path="/leer-codigo" element={<ReadCode />}>
          <Route path="confirmacion/:code" />
        </Route>
        <Route path="*" element={<CenteredContainer><h1>Página no encontrada</h1></CenteredContainer>} />
      </Routes>
      <Footer />
      <img src={bigImage} alt="preload bigImage" style={{ display: 'none' }} />
      <img src={heroFigure} alt="preload bigImage" style={{ display: 'none' }} />
    </div>
  )
}

export default App
