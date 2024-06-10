import './App.css'
import Header from './components/Header/Header.jsx'
import { Outlet, Link } from 'react-router-dom';

const App = () => {

  return (
    <div className="app-container">
      <div className='header-container'>
        <Header />
      </div>
      <div className='body-container'>
        
      </div>
      <div>
        test link
      </div>
      <div>

      </div>
    </div>
  );
}

export default App
