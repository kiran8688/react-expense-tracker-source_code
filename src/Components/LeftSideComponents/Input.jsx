import React, { Component } from 'react';
import DisplaySec1 from './RightSideComponents/DisplaySec1';
import DisplaySec2 from './RightSideComponents/DisplaySec2';

export class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tracker: []
    }
  }

  inputClickEventHandler = () => {
    const transactions = [...this.state.tracker]
    const amountInput = document.querySelector('#amount-input');
    const nameInput = document.querySelector('#name-input');
    const dateInput = document.querySelector('#date-input');

    let checkAmount = (amountInput.value === "") ? 0 : parseFloat(amountInput.value);
    if (isNaN(checkAmount)) checkAmount = 0;

    let checkName = (nameInput.value.trim() === "") ? "default-transaction" : nameInput.value.trim();
    checkName = checkName.substring(0, 100);

    let checkDate = (dateInput.value === "") ? new Date().toISOString().split('T')[0] : dateInput.value;
    if (isNaN(Date.parse(checkDate))) {
      checkDate = new Date().toISOString().split('T')[0];
    }

    transactions.unshift({ id: crypto.randomUUID(), transactionName: checkName, transactionAmount: checkAmount, transactionDate: checkDate })
    this.setState({ tracker: transactions })

    nameInput.value = "";
    amountInput.value = "";
    dateInput.value = "";
  }

  deleteHandler = (index) => {
    const transactions = [...this.state.tracker]
    transactions.splice(index, 1)
    this.setState({ tracker: transactions })
  }

  render() {
    const mapAmt = this.state.tracker.map(t => parseFloat(t.transactionAmount))
    const balance = mapAmt.reduce((a, b) => a + b, 0).toFixed(2)
    const income = mapAmt.filter(a => a > 0).reduce((a, b) => a + b, 0).toFixed(2)
    const expense = (mapAmt.filter(a => a < 0).reduce((a, b) => a + b, 0) * -1).toFixed(2)

    return (
      <div className='flex flex-col lg:flex-row gap-8 items-start animate-[slideIn_0.5s_ease-out]'>
        <div className='w-full lg:w-1/3 sticky top-8'>
          <div className='glass-morphism p-8 neon-shadow-blue'>
            <h3 className='text-2xl font-bold mb-8 flex items-center gap-2'>
              <span className='w-2 h-8 bg-neon-blue rounded-full'></span>
              NEW LOG
            </h3>

            <div className="space-y-6">
              <div>
                <label htmlFor='name-input' className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-black cursor-pointer">Designation</label>
                <input type="text" id='name-input' className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-neon-blue focus:bg-white/10 transition-all placeholder:text-white/10" placeholder='TRANSACTION ID' />
              </div>

              <div>
                <label htmlFor='amount-input' className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-black cursor-pointer">Credit/Debit Unit</label>
                <input type="number" id='amount-input' className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-neon-blue focus:bg-white/10 transition-all placeholder:text-white/10" placeholder='0.00' />
              </div>

              <div>
                <label htmlFor='date-input' className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-black cursor-pointer">Temporal Stamp</label>
                <input type="date" id='date-input' className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-neon-blue focus:bg-white/10 transition-all [color-scheme:dark]" />
              </div>

              <button className='w-full py-5 rounded-2xl bg-gradient-to-r from-neon-blue to-blue-600 text-white font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(0,210,255,0.3)]' onClick={this.inputClickEventHandler}>
                Initialize Entry
              </button>
            </div>
          </div>
        </div>

        <div className='w-full lg:w-2/3 space-y-8'>
          <DisplaySec1 dispBalAmt={balance} Income={income} Expense={expense} />

          <div className='glass-morphism p-8 min-h-[400px] relative overflow-hidden'>
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <h2 className="text-8xl font-black rotate-12">RECORDS</h2>
            </div>

            <h2 className='text-3xl font-black mb-10 flex items-center gap-4'>
              DATA FEED
              <span className="flex-1 h-px bg-white/10"></span>
            </h2>

            <div className='space-y-4'>
              {this.state.tracker.length === 0 ? (
                <div className='flex flex-col items-center justify-center py-20 text-white/20 uppercase tracking-[0.3em] font-bold'>
                  <div className="w-20 h-20 border-2 border-dashed border-white/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-4xl">!</span>
                  </div>
                  No sector activity detected
                </div>
              ) : (
                this.state.tracker.map((transaction, index) => (
                  <DisplaySec2
                    key={transaction.id}
                    dispName={transaction.transactionName}
                    dispAmount={transaction.transactionAmount}
                    dispDate={transaction.transactionDate}
                    trash={() => this.deleteHandler(index)}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Input;
