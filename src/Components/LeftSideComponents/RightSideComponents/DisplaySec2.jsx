import React, { Component } from 'react'

export class DisplaySec2 extends Component {
  render(props) {
    return (
      // <div className='mt-4'>
      //   <hr /> <span className='fs-2'>History  :</span>

      //   <br /><br />
        <div className=' fs-4 container mb-4'>
            <ul className=' container-auto  bg-white '>
            <li className=' row justify-content-around rounded border-end border-5 border-success mb-3 p-2 list-group-item shadow-lg d-flex bg-light '  > <strong className=' text-truncate col-6'>{this.props.dispName}</strong> <span className='col-3 text-secondary'>{this.props.dispDate}</span> <span className='col-3 text-truncate'>{this.props.dispAmount}</span> </li>
            {/* <li className=' row justify-content-around rounded border-end border-5 border-danger p-2 mb-3 list-group-item shadow d-flex bg-light'><strong className='text-truncate col-6' >movie making</strong> <span className='col-3 text-secondary'>10/12/2022</span> <span className='col-3'>-$50000</span></li>
            <li className=' row justify-content-around rounded border-end border-5 border-success p-2 mb-3 list-group-item shadow d-flex bg-light '> <strong className='text-truncate col-6'>shopping</strong> <span className='col-3 text-secondary'>10/12/2022</span> <span className='col-3'>+$900</span></li> */}
            </ul>
        </div>
      // </div>
    )
  }
}

export default DisplaySec2