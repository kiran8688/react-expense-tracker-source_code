import { Component } from 'react';
import './App.css';
import Input from './Components/LeftSideComponents/Input';

class App extends Component {

  

  render() {
    return (
      <div className="App ">   {/* Total Application is itallic font  */}
      <em>
      {/* -----------------------------------------------Nav-Bar Written here-------------------------------------------------------- */}
        <nav id='nav-title' className=' text-center bg-primary text-white'><span className=''> Expense-Tracker</span></nav>
      {/* --------------------------------------Input Component Called here ----------------------------------------------------------- */}
          <Input />

      </em>
      </div>
    );
  }
}
export default App;
