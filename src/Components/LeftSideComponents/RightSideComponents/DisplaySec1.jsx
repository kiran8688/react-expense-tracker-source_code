import React, { Component } from 'react'

export class DisplaySec1 extends Component {
  render() {
    const isPositive = parseFloat(this.props.dispBalAmt) >= 0;

    // Calculate progress bar ratio
    const incomeNum = parseFloat(this.props.Income) || 0;
    const expenseNum = parseFloat(this.props.Expense) || 0;
    const total = incomeNum + expenseNum;

    // Default to 50% if there are no transactions, otherwise calculate percentage
    const incomePercent = total === 0 ? 50 : (incomeNum / total) * 100;
    const expensePercent = total === 0 ? 50 : (expenseNum / total) * 100;

    return (
      <div className='glass-morphism p-10 relative overflow-hidden group'>
        <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 to-neon-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative z-10 flex flex-col items-center">
            <div className="text-[10px] uppercase tracking-[0.5em] text-white/40 mb-2 font-black" aria-hidden="true">CORE ASSET STATUS</div>
            <div
              className={`text-6xl md:text-8xl font-black tracking-tighter ${isPositive ? 'text-neon-blue shadow-neon-blue' : 'text-neon-pink shadow-neon-pink'}`}
              aria-label={`Current balance is ${isPositive ? 'positive' : 'negative'} $${Math.abs(this.props.dispBalAmt).toFixed(2)}`}
            >
            {isPositive ? '' : '-'}${Math.abs(this.props.dispBalAmt).toFixed(2)}
            </div>

            {/* Progress bar ratio */}
            <div
              className="mt-6 w-full max-w-md h-2 bg-white/10 rounded-full overflow-hidden flex"
              aria-label={`Income to Expense ratio: ${incomePercent.toFixed(0)}% to ${expensePercent.toFixed(0)}%`}
            >
                <div
                  className="h-full bg-neon-green transition-all duration-1000 ease-in-out"
                  style={{ width: `${incomePercent}%` }}
                ></div>
                <div
                  className="h-full bg-neon-pink transition-all duration-1000 ease-in-out"
                  style={{ width: `${expensePercent}%` }}
                ></div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 w-full relative z-10">
          <div className="glass-morphism bg-white/5 p-6 border-l-4 border-l-neon-green group/stat overflow-hidden" aria-label={`Net inflow: +$${this.props.Income}`}>
            <div className="text-[10px] uppercase tracking-widest text-white/30 mb-1 font-black" aria-hidden="true">NET INFLOW</div>
            <div className="text-3xl font-bold text-neon-green tracking-tight group-hover/stat:scale-105 transition-transform">
                +${this.props.Income}
            </div>
          </div>

          <div className="glass-morphism bg-white/5 p-6 border-l-4 border-l-neon-pink group/stat overflow-hidden" aria-label={`Net outflow: -$${this.props.Expense}`}>
            <div className="text-[10px] uppercase tracking-widest text-white/30 mb-1 font-black" aria-hidden="true">NET OUTFLOW</div>
            <div className="text-3xl font-bold text-neon-pink tracking-tight group-hover/stat:scale-105 transition-transform">
                -${this.props.Expense}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DisplaySec1
