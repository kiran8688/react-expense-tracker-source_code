import { Component } from 'react';
import './App.css';
import Input from './Components/LeftSideComponents/Input';
class App extends Component{
  render() {
  return (
    <div className="App">
    <nav id='nav-title' className='bg-primary h1 p-3 text-center  text-white '>Expense-Tracker</nav>
    <br /><br />
    <div className='row'>
    
      <Input   />
    
      <div className='col h1'>
        hello

      </div>
    
    </div>
    
    </div> 
  );
}
}
export default App;
