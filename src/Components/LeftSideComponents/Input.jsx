import React, { Component } from 'react';
import './Input.css'
// import DisplaySec1 from './Components/RightSideComponents/DisplaySec1';
// import DisplaySec2 from './Components/RightSideComponents/DisplaySec2';
import DisplaySec1 from './RightSideComponents/DisplaySec1';
import DisplaySec2 from './RightSideComponents/DisplaySec2';
export class Input extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tracker: []
    }
  }

  //   const currentConversation = state.conversation;
  // currentConversation.push((<div>new div</div>));
  // this.setState({conversation: currentConversation})

  inputClickEventHandler = () => {



    var transactions = [...this.state.tracker]

    transactions.push({ id: Math.random(), transactionName: document.querySelector('#name-input').value, transactionAmount: document.querySelector('#amount-input').value, transactionDate: document.querySelector('#date-input').value })



    this.setState({ tracker: transactions })
    // this.setState({
    //   tracker :[
    //   {id: Math.random(), transactionName : document.querySelector('#name-input').value, transactionAmount : document.querySelector('#amount-input').value, transactionDate : document.querySelector('#date-input').value},

    //   ]
    // })

    // this.state.tracker.push(this.setState.tracker) = transactions
    console.log(transactions)
    // var tracker = this.state.tracker
    //  this.tracker.push(transact)
    //  console.log(this.tracker);

    // document.querySelector('#name-input').value=null, document.querySelector('#amount-input').value=null, document.querySelector('#date-input').value=null; 
  }


  takeNameHandler = (e) => {

    // this.setState( this.state.tracker[0].transactionName =  e.target.value)
    console.log(e.target.value)

  }
  takeAmountHandler = (e) => {

    console.log(e.target.value)
  }
  takeDateHandler = (e) => {

    console.log(e.target.value)
  }


  render(props) {

    if (this.state.tracker === []) {
      var transact = (<center><br /><br /> Please add details of transaction</center>)
    }

    if (this.state.tracker !== "") {

      transact =
        this.state.tracker.map((transaction, index) => {

          return (

            <DisplaySec2 key={this.state.tracker[index].id} dispName={this.state.tracker[index].transactionName} dispAmount={this.state.tracker[index].transactionAmount} dispDate={this.state.tracker[index].transactionDate} />


          )

        })

    }
    // const convdata = this.state.tracker[0].transactionAmount
    // console.log(res)
    const mapAmt = this.state.tracker.map(totAmt => totAmt.transactionAmount)
    const parseIntAmt = parseInt(mapAmt)
    const reduceAmt = parseIntAmt.reduce((a, b) => (a += b), 0)
    // const totalAmt = reduceAmt.Math.trunk()
    // console.log(totalAmt)
    console.log(typeof(reduceAmt))

    return (
      <>
        <div className='row'>
          <div id='input-head' className='col-3 ms-1 text-dark text-start bg-white'><br /><br /><br /><br />
            <div className='container '><u className='opacity-75'><em> Add New Transaction Here :</em></u></div>
            <br /><br />
            <div className="h4 container-fluid ms-2 " >Transaction Name:  <input type="text" id='name-input' className='form-control' placeholder='Enter Transaction Name' onChange={this.takeNameHandler} />
            </div>
            <br /><br /><br />

            <div className="h4 container-fluid ms-2" >Enter Amount : <label className='fs-6 opacity-75'>(Add <strong className='fs-3 text-success ' >+</strong> if its <span className='text-success'>INCOME</span>     ,    Add <strong className='fs-2 text-danger' >-</strong> if its <span className='text-danger'>Expense</span>)</label><input type="number" id='amount-input' className='form-control' placeholder='Enter Transaction Amount' onChange={this.takeAmountHandler} />
            </div>
            <br /><br /><br />
            <div className="h4 container-fluid ms-2 " >Date of Transaction :  <input type="date" id='date-input' className='form-control' onChange={this.takeDateHandler} />
            </div>
            <br /><br /><br />
            <button type='submit' className=' btn btn-primary ms-1 container-fluid  text-white border-white rounded-5 form-control' onClick={this.inputClickEventHandler}  >submit</button>
            <br /><br /><br /><br /> <br /><br /><br /><br />


          </div>

          <div className='col-auto h1 text-black '>
            <div id='vr' className="vr "></div>
          </div>

          <div className='col-8'>
            <DisplaySec1 />

            <div className='mt-4'>
              <hr /> <span className='fs-2'>History  :</span>

              <br /><br />

              {transact}
            </div>
            {/* <DisplaySec2 dispName={this.state.tracker[0].transactionName} dispAmount={this.state.tracker[0].transactionAmount} dispDate={this.state.tracker[0].transactionDate} /> */}
          </div>
        </div>
      </>
    )
  }
}

export default Input;



// (e) => this.setState(e.target.value, console.log(e.target.value)) 
