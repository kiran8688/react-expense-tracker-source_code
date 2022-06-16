import React, { Component } from 'react'
import './DisplaySec1.css'

export class DisplaySec1 extends Component {
  render(props) {
    return (
      <div className=''>
        <div className='fs-1 mt-3  '>
          Your Balance is <span className='text-success'> $ 80</span>
        </div><br /> 

        <div className="container px-1">
          <div className="row gx-5">
            <div className="col text-center fs-3">
            <div id='gutt-tab1' className="p-3 border bg-light rounded-5   ">Income <br /><span className='text-success '>$100</span> </div>
            </div>
            <div className="col text-center fs-3">
              <div id='gutt-tab2' className="p-3 border bg-light rounded-5">Expense <br /><span className='text-danger'>$100</span> </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DisplaySec1