import { Component } from 'react';
import './App.css';
import Input from './Components/LeftSideComponents/Input';
import DisplaySec1 from './Components/RightSideComponents/DisplaySec1';
import DisplaySec2 from './Components/RightSideComponents/DisplaySec2';
class App extends Component {
  render() {
    return (
      <div className="App "><em>
        <nav id='nav-title' className=' text-center bg-primary text-white'><span className=''> Expense-Tracker</span></nav>

        <div className='row'>

          <Input />
          <div className='col-auto h1 text-black '>
            <div id='vr' className="vr "></div>
          </div>

          <div className='col-8'>
            <DisplaySec1 />
            <DisplaySec2 />
          </div>



        </div>

      </em>
      </div>
    );
  }
}
export default App;
