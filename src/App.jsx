import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import BuscadorFichas from './pages/BuscadorFichas.jsx';



function App() {
 

  return (
   
      <Routes>
        
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path='/buscador' element={<BuscadorFichas/>}/>
      </Routes>
    
  )
}

export default App
