import React, { Component } from 'react';
import './Input.css'
import DisplaySec1 from './RightSideComponents/DisplaySec1';
import DisplaySec2 from './RightSideComponents/DisplaySec2';
export class Input extends Component {
//----------------***Declaring State Here***---------------------------------
  constructor(props) {
    super(props)
    this.state = {
      tracker: []
    }
  }
//---------------------------------//Input Click event handler - allocated operation//----------------------------------------------// 
  inputClickEventHandler = () => {

    const transactions = [...this.state.tracker]

    var checkAmount = (document.querySelector('#amount-input').value === "") ? 0 : document.querySelector('#amount-input').value
    var checkName = (document.querySelector('#name-input').value === "") ? "default-transaction" : document.querySelector('#name-input').value
    var checkDate = (document.querySelector('#date-input').value === "") ? '0001-01-01' : document.querySelector('#date-input').value

    transactions.push({ id: Math.random(), transactionName: checkName, transactionAmount: checkAmount, transactionDate: checkDate })

    this.setState({ tracker: transactions })

    console.log(transactions)
//------------------------------// Making Given Inputs as None here //---------------------------------------------//  
    document.querySelector('#name-input').value = "";
    document.querySelector('#amount-input').value = "none"
    document.querySelector('#date-input').value = "none"

  }
//-------------------------------------delete operation  logic from here ------------------------------------------

  deleteHandler = (transactionId) => {
    const transactions = [...this.state.tracker]
    console.log(transactionId)
    transactions.splice(transactionId, 1)
    this.setState({ tracker: transactions })
  }
//----------------------------------------------------------------------------------------------------------

//---------------------------render starts from here--------------------------------------------------------------
render(props) {

    var transact
//---------------------------------------------DisplaySec2 render logic from here (UI)----------------------------------------------
    if (this.state.tracker == "") {
      transact = (<center className=" fs-5 text-secondary " >Currently no transaction Recorded, Please add details of the transaction </center>)
    }

    else {

      transact =
        this.state.tracker.map((transaction, index) => {

          return (

            <DisplaySec2 key={this.state.tracker[index].id}
              dispName={this.state.tracker[index].transactionName}
              dispAmount={this.state.tracker[index].transactionAmount}
              dispDate={this.state.tracker[index].transactionDate}
              trash={() => this.deleteHandler([index])} />


          )

        })

    }
//--------------------------------------------------------------------------------------------------------------------------------------
    // console.log(this.state.tracker)

    //---------------- DisplaySec1 logic from here ----------------------------------------

    const mapAmt = this.state.tracker.map(totAmt => (parseInt(totAmt.transactionAmount)))



    const reduceAmt = mapAmt.reduce((a, b) => (a += b), 0).toFixed(2)

    // console.log(reduceAmt)

    const totAmtSaveed = mapAmt.filter(saved => saved >= 0).reduce((a, b) => (a += b), 0).toFixed(2)
    const totAmtSpent = (mapAmt.filter(spent => spent <= 0).reduce((a, b) => (a += b), 0) * -1).toFixed(2)

    //-----------------------------------------------------------------------------------------------------

    return (
      <>
      {/*-----------------------------------------------------------------------*** Input component UI starts from here ***------------------------------------------------------------------------------- */}
        <div className='row'>
          <div id='input-head' className='col-3 ms-1 text-dark text-start'><br /><br /><br /><br />
            <div className='container '><u className='opacity-75'><em> Add New Transaction Here :</em></u></div>
            <br /><br />
            <div className="h4 container-fluid ms-2 " >Transaction Name:  <input type="text" id='name-input' className='form-control' placeholder='Enter Transaction Name' onChange={this.takeNameHandler} />
            </div>
            <br /><br /><br />

            <div className="h4 container-fluid ms-2" >Enter Amount : <label className='fs-6 opacity-75'>(Add <strong className='fs-3 text-success ' >+</strong> if its <span className='text-success'>INCOME</span>     ,    Add <strong className='fs-2 text-danger' >-</strong> if its <span className='text-danger'>EXPENSE</span>)</label><input type="number" id='amount-input' className='form-control' placeholder='Enter Transaction Amount' onChange={this.takeAmountHandler} />
            </div>
            <br /><br /><br />
            <div className="h4 container-fluid ms-2 " >Date of Transaction :  <input type="date" id='date-input' className='form-control' onChange={this.takeDateHandler} />
            </div>
            <br /><br /><br />
            <button type='submit' className=' btn btn-primary ms-1 container-fluid  text-white border-white rounded-5 form-control' onClick={() => this.inputClickEventHandler()}  >submit</button>
            <br /><br /><br />


          </div>
      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
          <div className='col-auto h1 text-black '>
            <div id='vr' className="vr "></div>
          </div>

          <div className='col-8'>
            {/*---------- DisplaySec1 renders from here--------- */}
            <DisplaySec1 dispBalAmt={reduceAmt} Income={totAmtSaveed} Expense={totAmtSpent} />

            <div className='mt-4'>
              {/*--------- DisplaySec2  renders from here---------- */}
              <hr /> <span className='fs-2'>History   :</span>

              <br /><br />
              {/*------***look  at DisplaySec2 render logic (UI)***----------- */}
              {transact}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Input;
