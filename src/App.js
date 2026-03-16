import { Component } from 'react';
import './App.css';
import Input from './Components/LeftSideComponents/Input';

class App extends Component {
  render() {
    return (
      <div id="app" className="h-full w-full flex flex-col overflow-auto scrollbar-thin" style={{ background: 'linear-gradient(160deg, #0a0a0f 0%, #0f1020 40%, #0a0a0f 100%)' }}>
        <header className="px-5 pt-6 pb-2 flex items-center justify-between anim-slide-up">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" id="logo-box" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wallet">
                <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a8 8 0 0 1-8 8H5a2 2 0 0 1-2-2V5"/>
                <path d="M22 12h-4v4h4v-4Z"/>
              </svg>
            </div>
            <h1 id="app-title" className="text-xl font-bold tracking-tight text-[#e0e7ff]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Finely</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 active-dot"></span>
            <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>Live</span>
          </div>
        </header>

        <Input />
      </div>
    );
  }
}
export default App;
