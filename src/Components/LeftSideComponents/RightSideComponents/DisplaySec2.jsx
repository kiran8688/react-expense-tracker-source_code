import React, { Component } from 'react'

export class DisplaySec2 extends Component {
  render() {
    const isIncome = parseFloat(this.props.dispAmount) > 0;

    return (
      <div
        className="group relative flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-3xl hover:bg-white/10 hover:border-white/10 hover:scale-[1.01] hover:translate-x-2 transition-all duration-300 overflow-hidden"
        role="listitem"
        aria-label={`${isIncome ? 'Income' : 'Expense'} entry: ${this.props.dispName} for $${Math.abs(this.props.dispAmount).toFixed(2)} on ${this.props.dispDate}`}
      >
        {/* Type Indicator */}
        <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${isIncome ? 'bg-neon-green shadow-[0_0_15px_rgba(57,255,20,0.5)]' : 'bg-neon-pink shadow-[0_0_15px_rgba(255,0,127,0.5)]'}`} aria-hidden="true"></div>

        <div className="flex items-center gap-6">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl ${isIncome ? 'bg-neon-green/10 text-neon-green' : 'bg-neon-pink/10 text-neon-pink'}`} aria-hidden="true">
                {isIncome ? '↑' : '↓'}
            </div>
            <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-white/90 group-hover:text-white transition-colors">
                    {this.props.dispName}
                </span>
                <span className="text-xs font-medium text-white/30 uppercase tracking-widest mt-1">
                    {this.props.dispDate}
                </span>
            </div>
        </div>

        <div className="flex items-center gap-8">
            <div className={`text-xl font-black tabular-nums ${isIncome ? 'text-neon-green' : 'text-neon-pink'}`}>
                {isIncome ? '+' : '-'}${Math.abs(this.props.dispAmount).toFixed(2)}
            </div>

            <button
                onClick={this.props.trash}
                className="p-3 rounded-xl bg-white/0 hover:bg-neon-pink/10 text-white/20 hover:text-neon-pink transition-all group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-neon-pink"
                aria-label={`Delete entry ${this.props.dispName}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
            </button>
        </div>
      </div>
    )
  }
}

export default DisplaySec2
