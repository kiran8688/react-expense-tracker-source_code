import React, { Component } from 'react'

export class DisplaySec2 extends Component {
  render() {
    const isIncome = parseFloat(this.props.dispAmount) >= 0;
    const absAmount = Math.abs(parseFloat(this.props.dispAmount)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const formattedAmount = (isIncome ? '+' : '-') + '$' + absAmount;

    // Based on Expense Tracker Pro logic:
    // Fallback category visual representation
    const catLabel = isIncome ? 'Income' : 'Expense';
    const catIcon = isIncome ? 'I' : 'E';
    const catColor = isIncome ? '#10b981' : '#f59e0b'; // Just using some default colors for simplicity, similar to the original JS script

    // Format date string to match "Dec 12" style if possible
    let dateStr = this.props.dispDate;
    try {
      const d = new Date(this.props.dispDate);
      if (!isNaN(d.getTime())) {
        dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }
    } catch(e) {}

    return (
      <div className="transaction-item flex items-center gap-3 p-3.5 rounded-xl mb-2 cursor-default group" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${catColor}18` }}>
          <span className="text-base">{catIcon}</span>
        </div>

        <div className="flex-1 min-w-0">
          <p className="tx-title text-sm font-semibold text-gray-200 truncate">{this.props.dispName}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="tx-cat text-[11px] font-medium text-gray-500">{catLabel}</span>
            <span className="text-gray-700">·</span>
            <span className="tx-date text-[11px] text-gray-600">{dateStr}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="tx-amount mono text-sm font-bold" style={{ color: isIncome ? '#34d399' : '#f87171' }}>
            {formattedAmount}
          </span>
          <button
            onClick={this.props.trash}
            className="w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ background: 'rgba(239,68,68,0.1)' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2">
              <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>
            </svg>
          </button>
        </div>
      </div>
    )
  }
}

export default DisplaySec2
