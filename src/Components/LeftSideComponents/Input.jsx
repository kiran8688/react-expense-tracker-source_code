import React, { Component } from 'react';
import DisplaySec1 from './RightSideComponents/DisplaySec1';
import DisplaySec2 from './RightSideComponents/DisplaySec2';

export class Input extends Component {
  constructor(props) {
    super(props)
    const savedTracker = localStorage.getItem('expenseTracker');
    this.state = {
      tracker: savedTracker ? JSON.parse(savedTracker) : [],
      filter: 'all' // 'all', 'income', 'expense'
    }
  }

  inputClickEventHandler = () => {
    const transactions = [...this.state.tracker]
    const amountInput = document.querySelector('#amount-input');
    const nameInput = document.querySelector('#name-input');
    const dateInput = document.querySelector('#date-input');

    let checkAmount = (amountInput.value === "") ? 0 : parseFloat(amountInput.value);
    if (isNaN(checkAmount)) checkAmount = 0;

    if (checkAmount === 0) {
      alert("Please enter a valid amount (non-zero).");
      return;
    }

    let checkName = (nameInput.value.trim() === "") ? "default-transaction" : nameInput.value.trim();
    checkName = checkName.substring(0, 100);

    let checkDate = (dateInput.value === "") ? new Date().toISOString().split('T')[0] : dateInput.value;
    if (isNaN(Date.parse(checkDate))) {
      checkDate = new Date().toISOString().split('T')[0];
    }

    transactions.unshift({ id: Math.random(), transactionName: checkName, transactionAmount: checkAmount, transactionDate: checkDate })
    this.setState({ tracker: transactions }, () => {
      localStorage.setItem('expenseTracker', JSON.stringify(transactions));
    })

    nameInput.value = "";
    amountInput.value = "";
    dateInput.value = "";
  }

  deleteHandler = (index) => {
    const transactions = [...this.state.tracker]
    transactions.splice(index, 1)
    this.setState({ tracker: transactions }, () => {
      localStorage.setItem('expenseTracker', JSON.stringify(transactions));
    })
  }

  setFilter = (filterType) => {
    this.setState({ filter: filterType })
  }

  render() {
    const { tracker, filter } = this.state;
    const mapAmt = tracker.map(t => parseFloat(t.transactionAmount))
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

            <h2 className='text-3xl font-black mb-6 flex items-center gap-4'>
              DATA FEED
              <span className="flex-1 h-px bg-white/10"></span>
            </h2>

            <div className="flex gap-2 mb-6">
              <button
                onClick={() => this.setFilter('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${filter === 'all' ? 'bg-neon-blue text-black shadow-[0_0_15px_rgba(0,210,255,0.5)]' : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'}`}
              >
                All
              </button>
              <button
                onClick={() => this.setFilter('income')}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${filter === 'income' ? 'bg-neon-green text-black shadow-[0_0_15px_rgba(57,255,20,0.5)]' : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'}`}
              >
                Inflow
              </button>
              <button
                onClick={() => this.setFilter('expense')}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${filter === 'expense' ? 'bg-neon-pink text-black shadow-[0_0_15px_rgba(255,0,127,0.5)]' : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'}`}
              >
                Outflow
              </button>
            </div>

            <div className='space-y-4'>
              {tracker.length === 0 ? (
                <div className='flex flex-col items-center justify-center py-20 text-white/20 uppercase tracking-[0.3em] font-bold'>
                  <div className="w-20 h-20 border-2 border-dashed border-white/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-4xl">!</span>
                  </div>
                  Currently no transaction Recorded, Please add details of the transaction
                </div>
              ) : (
                this.state.tracker.map((transaction, index) => (
                  <DisplaySec2
                    key={transaction.id || index}
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
