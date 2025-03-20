import './App.css'
import HeaderComponent from './components/HeaderComponent'
import 'bootstrap/dist/css/bootstrap.min.css';
import CarruselComponent from './components/CarruselComponent'
import MidSecComponent from './components/MidSecComponent'
import Gallery from './components/Gallery'
import ServiciosComponent from './components/ServiciosComponent'
import ContactoLinks from './components/ContactoLinks'
import Footer from './components/footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';



function App() {
 

  return (
   
      <Routes>
        
          <Route path="/" element={<Home />} />
          
      </Routes>
    
  )
}

export default App
