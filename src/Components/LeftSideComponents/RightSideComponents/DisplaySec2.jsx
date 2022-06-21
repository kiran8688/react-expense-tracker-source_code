import React, { Component } from 'react'
import './DisplaySec2.css'

export class DisplaySec2 extends Component {


  render(props) {

    // ---------------------------------------------------------------------***History list starts from here ****Red Color list UI****-----------------------------------------------------------------------------
    var amountlist
    if (this.props.dispAmount <= 0) {

      return (amountlist =

        <div id='list' className=' row fs-4 mb-1'>
          <ul className=' col-11 container-auto ps-5 '>

            <li className=' row  rounded border-end border-5  border-danger mb-3 p-2 list-group-item shadow-lg d-flex bg-light'  > <strong className=' text-truncate col-6'>{this.props.dispName}</strong> <span className='col-3 text-secondary'>{this.props.dispDate}</span> <span className='col-3 text-truncate'> <span>-$</span>{this.props.dispAmount * -1}</span> </li>
          </ul>
          {/*----------------- trash (delete Icon) here------------------------------------------------------ */}
          <svg onClick={this.props.trash} id='delete-button' xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3  col-1 mt-3 " viewBox="0 0 16 16">

            <path id='path' d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
          </svg>
        </div>
      )
      
      // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    }
    // ---------------------------------------------------------------------***History list starts from here ****Green Color list UI****-----------------------------------------------------------------------------

    else {

      return (amountlist =

        <div id='list' className=' row fs-4 mb-1'>
          <ul className=' col-11 container-auto ps-5 '>

            <li className=' row rounded border-end border-5  border-success mb-3 p-2 list-group-item shadow-lg d-flex bg-light '  > <strong className=' text-truncate col-6'>{this.props.dispName}</strong> <span className='col-3 text-secondary'>{this.props.dispDate}</span> <span className='col-3 text-truncate'> <span>+$</span>{this.props.dispAmount}</span> </li>

          </ul>
          {/*----------------- trash (delete Icon) here------------------------------------------------------ */}
          <svg onClick={this.props.trash} id='delete-button' xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3 col-1 mt-3 " viewBox="0 0 16 16">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
          </svg>
        </div>

      )
        //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    }
    return (


      {/* <li className=' row justify-content-around rounded border-end border-5 border-danger p-2 mb-3 list-group-item shadow d-flex bg-light'><strong className='text-truncate col-6' >movie making</strong> <span className='col-3 text-secondary'>10/12/2022</span> <span className='col-3'>-$50000</span></li>
            <li className=' row justify-content-around rounded border-end border-5 border-success p-2 mb-3 list-group-item shadow d-flex bg-light '> <strong className='text-truncate col-6'>shopping</strong> <span className='col-3 text-secondary'>10/12/2022</span> <span className='col-3'>+$900</span></li> */}


    )
  }
}

export default DisplaySec2