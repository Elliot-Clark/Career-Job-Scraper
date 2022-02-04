import logo from './logo.svg';
import './App.css';
import ClientInput from './components/clientInput/clientInput';


function App() {
  return (
    <div className="App">
      <header className="App-header">

        <img src={logo} className="App-logo" alt="logo" />
        <ClientInput />
      </header>
    </div>
  );
}

export default App;
