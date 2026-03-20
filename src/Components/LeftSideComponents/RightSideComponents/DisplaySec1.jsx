import React, { Component } from 'react'

export class DisplaySec1 extends Component {
  render() {
    const bal = parseFloat(this.props.dispBalAmt);
    const formattedBalance = (bal < 0 ? '-' : '') + '₹' + Math.abs(bal).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const formattedIncome = '₹' + parseFloat(this.props.Income).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const formattedExpense = '₹' + parseFloat(this.props.Expense).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return (
      <section className="px-5 pt-4 pb-2 anim-slide-up delay-1" style={{ opacity: 1 }}>
        <div className="glass-card rounded-2xl p-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.08))', border: '1px solid rgba(99,102,241,0.2)' }}>
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}></div>
          <p id="balance-label" className="text-sm text-gray-400 font-medium mb-1">Total Balance</p>
          <p id="balance-amount" className="mono text-4xl font-bold tracking-tight" style={{ color: '#c7d2fe' }}>{formattedBalance}</p>

          <div className="flex gap-6 mt-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.15)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
                </svg>
              </div>
              <div>
                <p id="income-label-display" className="text-[11px] text-gray-500 font-medium uppercase tracking-wider">Income</p>
                <p id="income-amount" className="mono text-sm font-bold text-emerald-400">{formattedIncome}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.15)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-down">
                  <polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/>
                </svg>
              </div>
              <div>
                <p id="expense-label-display" className="text-[11px] text-gray-500 font-medium uppercase tracking-wider">Expenses</p>
                <p id="expense-amount" className="mono text-sm font-bold text-red-400">{formattedExpense}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default DisplaySec1
