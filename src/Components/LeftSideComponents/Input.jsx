import React, { Component } from 'react';
import './Input.css'

export class Input extends Component {

    inputClickEventHandler = () =>{
       console.log( document.querySelector('#name-input').value,
        document.querySelector('#amount-input').value,
        document.querySelector('#date-input').value)

    }


  render(props) {

    return (
      <div className='col-5'><br /><br /><br /><br /><br /><br /><br /><br />
        <div className="h4 container-fluid ms-2 " >Transaction Name:  <input type="text" id='name-input' className='form-control' placeholder='Enter Transaction Name' />
        </div> 
        <br /><br /><br />
        
        <div  className="h4 container-fluid ms-2" >Enter Amount : <label className='fs-6 opacity-75'>(Add <strong className='fs-3 text-success ' >+</strong> if its <span className='text-success'>INCOME</span>     ,    Add <strong className='fs-2 text-danger' >-</strong> if its <span className='text-danger'>Expense</span>)</label><input type="number" id='amount-input' className='form-control' placeholder='Enter Transaction Name' />
        </div>
        <br /><br /><br />
        <div  className="h4 container-fluid ms-2 " >Date of Transaction :  <input type="date" id='date-input'
        className='form-control' placeholder='Enter Transaction Name' />
        </div>
        <br /><br /><br />
        <button type='submit' className=' btn btn-primary ms-2 text-white border-white rounded-5 form-control' onClick={this.inputClickEventHandler}  >submit</button>
        <br /><br /><br /><br /> <br /><br /><br /><br />
       
      </div>
    )
  }
}

export default Input;