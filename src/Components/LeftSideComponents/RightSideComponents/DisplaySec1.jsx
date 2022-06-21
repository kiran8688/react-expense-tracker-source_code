import React, { Component } from 'react'
import './DisplaySec1.css'

export class DisplaySec1 extends Component {
  render(props) {

    // --------------------------------------------------------------------------------------Balance Logic starts here -----------------------------------------------------------------------------------

    var Balance

    if (this.props.dispBalAmt >= 0) {

      Balance = <span className='text-success'>${this.props.dispBalAmt}</span>

    }
    else {
      Balance = <span className='text-danger'>-${(this.props.dispBalAmt * -(1)).toFixed(2)}</span>
    }
    return (
      <div className='one'>
        <div className='fs-1 mt-3  '>
          {/* --------------------------------------------------***Balance UI starts here***-------------------------------------------------- */}
          Your Balance is  {Balance}
        </div><br />

        <div className="container px-1">
          <div className="row gx-5">
              {/* ----------------------------------------------------------------------------***Income UI starts from here***------------------------------------------------------------------------------- */}
            <div className="col text-center fs-3">
              <div id='gutt-tab1' className="p-3 border border-1 border-success  rounded-5 bg-light   ">Income <br /><span id='text-success' className='text-success '><span>+$</span>{this.props.Income}</span> </div>
            </div>
              {/* ----------------------------------------------------------------------------*** Expense UI starts from here***------------------------------------------------------------------------------- */}

            <div className="col text-center fs-3">
              <div id='gutt-tab2' className="p-3 border border-1 border-danger rounded-5  bg-light ">Expense <br /><span id='text-danger' className='text-danger'><span>-$</span>{this.props.Expense}</span> </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DisplaySec1

