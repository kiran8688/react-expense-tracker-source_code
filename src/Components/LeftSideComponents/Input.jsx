import React, { Component, Fragment } from 'react';
import DisplaySec1 from './RightSideComponents/DisplaySec1';
import DisplaySec2 from './RightSideComponents/DisplaySec2';

export class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tracker: [],
      currentType: 'expense',
      currentFilter: 'all'
    }
    this.amountInputRef = React.createRef();
    this.nameInputRef = React.createRef();
    this.dateInputRef = React.createRef();
  }

  setType = (type) => {
    this.setState({ currentType: type })
  }

  setFilter = (filter) => {
    this.setState({ currentFilter: filter })
  }

  inputClickEventHandler = () => {
    const transactions = [...this.state.tracker]
    const amountInput = this.amountInputRef.current;
    const nameInput = this.nameInputRef.current;
    const dateInput = this.dateInputRef.current;

    const rawAmount = amountInput.value === "" ? 0 : parseFloat(amountInput.value);
    const checkAmountBase = isNaN(rawAmount) ? 0 : rawAmount;

    // Convert to negative if expense, positive if income
    const finalAmount = this.state.currentType === 'expense' ? -Math.abs(checkAmountBase) : Math.abs(checkAmountBase);

    const rawName = nameInput.value.trim();
    const checkName = (rawName === "" ? "default-transaction" : rawName).substring(0, 100);

    const rawDate = dateInput.value === "" ? new Date().toISOString().split('T')[0] : dateInput.value;
    const checkDate = isNaN(Date.parse(rawDate)) ? new Date().toISOString().split('T')[0] : rawDate;

    transactions.unshift({
      id: Date.now(),
      transactionName: checkName,
      transactionAmount: finalAmount,
      transactionDate: checkDate,
      type: this.state.currentType
    })
    this.setState({ tracker: transactions })

    nameInput.value = "";
    amountInput.value = "";
    dateInput.value = new Date().toISOString().split('T')[0];
    nameInput.focus();
  }

  deleteHandler = (index) => {
    const transactions = [...this.state.tracker]
    transactions.splice(index, 1)
    this.setState({ tracker: transactions })
  }

  componentDidMount() {
    const dateInput = this.dateInputRef.current;
    if (dateInput) {
      dateInput.value = new Date().toISOString().split('T')[0];
    }
  }

  render() {
    const mapAmt = this.state.tracker.map(t => parseFloat(t.transactionAmount))
    const balance = mapAmt.reduce((a, b) => a + b, 0).toFixed(2)
    const income = mapAmt.filter(a => a > 0).reduce((a, b) => a + b, 0).toFixed(2)
    const expense = (mapAmt.filter(a => a < 0).reduce((a, b) => a + b, 0) * -1).toFixed(2)

    const filteredTracker = this.state.tracker.filter(t => {
      if (this.state.currentFilter === 'all') return true;
      const isIncome = t.transactionAmount > 0;
      if (this.state.currentFilter === 'income') return isIncome;
      if (this.state.currentFilter === 'expense') return !isIncome;
      return true;
    });

    // Pre-calculate the indices of transactions in the original tracker array
    // to avoid O(N^2) searches during the map operation in the render list
    const idToIndexMap = new Map();
    this.state.tracker.forEach((t, i) => idToIndexMap.set(t.id, i));

    return (
      <Fragment>
        <DisplaySec1 dispBalAmt={balance} Income={income} Expense={expense} />

        {/* Add Transaction Form */}
        <section className="px-5 pt-2 pb-3 anim-slide-up delay-3" style={{ opacity: 1 }}>
          <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-center gap-2 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus-circle">
                <circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/>
              </svg>
              <h2 className="text-sm font-semibold text-gray-300">New Transaction</h2>
            </div>

            {/* Type Toggle */}
            <div role="group" aria-label="Transaction Type" className="flex rounded-xl p-1 mb-4" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <button
                type="button"
                id="type-expense"
                aria-pressed={this.state.currentType === 'expense'}
                onClick={() => this.setType('expense')}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 ${this.state.currentType === 'expense' ? 'text-[#f87171]' : 'text-gray-500'}`}
                style={{ background: this.state.currentType === 'expense' ? 'rgba(239,68,68,0.2)' : 'transparent' }}
              >
                Expense
              </button>
              <button
                type="button"
                id="type-income"
                aria-pressed={this.state.currentType === 'income'}
                onClick={() => this.setType('income')}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 ${this.state.currentType === 'income' ? 'text-[#34d399]' : 'text-gray-500'}`}
                style={{ background: this.state.currentType === 'income' ? 'rgba(16,185,129,0.2)' : 'transparent' }}
              >
                Income
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); this.inputClickEventHandler(); }}>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="col-span-2">
                  <label htmlFor="input-title" className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Description <span className="text-red-500" aria-hidden="true">*</span></label>
                  <input ref={this.nameInputRef} id="input-title" type="text" placeholder={this.state.currentType === 'income' ? 'e.g. Salary' : 'e.g. Groceries'} required className="w-full rounded-xl px-4 py-3 text-sm font-medium placeholder-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'white' }} />
                </div>
                <div>
                  <label htmlFor="input-amount" className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Amount <span className="text-red-500" aria-hidden="true">*</span></label>
                  <div className="relative flex items-center">
                    <span className={`absolute left-4 font-medium select-none ${this.state.currentType === 'income' ? 'text-emerald-400' : 'text-red-400'}`} aria-hidden="true">
                      {this.state.currentType === 'income' ? '+₹' : '-₹'}
                    </span>
                    <input ref={this.amountInputRef} id="input-amount" type="number" min="0" step="0.01" placeholder="0.00" required className={`w-full rounded-xl pl-10 pr-4 py-3 text-sm font-medium placeholder-gray-500 mono focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 ${this.state.currentType === 'income' ? 'text-emerald-400' : 'text-red-400'}`} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }} />
                  </div>
                </div>
                <div>
                  <label htmlFor="input-date" className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Date <span className="text-red-500" aria-hidden="true">*</span></label>
                  <input ref={this.dateInputRef} id="input-date" type="date" required className="w-full rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'white', colorScheme: 'dark' }} />
                </div>
              </div>

              <button type="submit" id="add-btn" className="btn-primary w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300" style={{ background: 'linear-gradient(135deg,#6366f1,#7c3aed)', color: 'white' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus">
                  <path d="M5 12h14"/><path d="M12 5v14"/>
                </svg>
                <span>Add Transaction</span>
              </button>
            </form>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="px-5 pt-1 pb-2 anim-slide-up delay-4" style={{ opacity: 1 }}>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-gray-400">Recent Activity</h2>
            <div role="group" aria-label="Transaction Filter" className="flex rounded-lg p-0.5" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <button type="button" onClick={() => this.setFilter('all')} id="filter-all" aria-pressed={this.state.currentFilter === 'all'} className={`px-3 py-1 rounded-md text-xs font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 ${this.state.currentFilter === 'all' ? 'text-[#a5b4fc]' : 'text-gray-500'}`} style={{ background: this.state.currentFilter === 'all' ? 'rgba(99,102,241,0.2)' : 'transparent' }}>All</button>
              <button type="button" onClick={() => this.setFilter('income')} id="filter-income" aria-pressed={this.state.currentFilter === 'income'} className={`px-3 py-1 rounded-md text-xs font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 ${this.state.currentFilter === 'income' ? 'text-[#a5b4fc]' : 'text-gray-500'}`} style={{ background: this.state.currentFilter === 'income' ? 'rgba(99,102,241,0.2)' : 'transparent' }}>Income</button>
              <button type="button" onClick={() => this.setFilter('expense')} id="filter-expense" aria-pressed={this.state.currentFilter === 'expense'} className={`px-3 py-1 rounded-md text-xs font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 ${this.state.currentFilter === 'expense' ? 'text-[#a5b4fc]' : 'text-gray-500'}`} style={{ background: this.state.currentFilter === 'expense' ? 'rgba(99,102,241,0.2)' : 'transparent' }}>Expense</button>
            </div>
          </div>
        </section>

        {/* Transaction List */}
        <section className="px-5 pb-8 flex-1 overflow-auto scrollbar-thin anim-slide-up delay-5" style={{ opacity: 1 }}>
          <div id="transaction-list">
            {filteredTracker.length === 0 ? (
              <div id="empty-state" className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'rgba(99,102,241,0.1)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-receipt">
                    <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17.5v-11"/>
                  </svg>
                </div>
                <p className="text-gray-500 text-sm font-medium">No transactions yet</p>
                <p className="text-gray-600 text-xs mt-1">Add your first transaction above</p>
              </div>
            ) : (
              filteredTracker.map((transaction) => {
                const originalIndex = idToIndexMap.get(transaction.id);
                return (
                  <DisplaySec2
                    key={transaction.id}
                    dispName={transaction.transactionName}
                    dispAmount={transaction.transactionAmount}
                    dispDate={transaction.transactionDate}
                    trash={() => this.deleteHandler(originalIndex)}
                  />
                )
              })
            )}
          </div>
        </section>

      </Fragment>
    )
  }
}

export default Input;
