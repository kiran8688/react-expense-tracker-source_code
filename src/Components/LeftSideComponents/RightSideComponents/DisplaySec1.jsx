import React, { Component } from 'react'
import './DisplaySec1.css'

export class DisplaySec1 extends Component {
  render(props) {
    return (
      <div className='bg-white'>
        <div className='fs-1 mt-3  '>
          Your Balance is <span className='text-success'><span>$</span>80</span>
        </div><br />

        <div className="container px-1">
          <div className="row gx-5">
            <div className="col text-center fs-3">
              <div id='gutt-tab1' className="p-3 border  rounded-5 bg-light  ">Income <br /><span id='text-success' className='text-success '><span>+$</span>100</span> </div>
            </div>
            <div className="col text-center fs-3">
              <div id='gutt-tab2' className="p-3 border rounded-5 bg-light ">Expense <br /><span id='text-danger' className='text-danger'><span>-$</span>100</span> </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DisplaySec1

