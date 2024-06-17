import './App.css'
import Routing from './routing/Routing.jsx';
import { Outlet, Link } from 'react-router-dom';
import Homepage from './components/Page/Homepage.jsx';
import "antd/dist/reset.css";
const App = () => {

  return (
      <Routing>
      <Homepage/>
      </Routing>
  );
}

export default App
