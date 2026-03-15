import { Component } from 'react';
import './App.css';
import Input from './Components/LeftSideComponents/Input';

class App extends Component {
  render() {
    return (
      <div className="min-h-screen bg-dark-bg text-white font-['Inter'] selection:bg-neon-blue/30 p-4 md:p-8">
        <header className="max-w-7xl mx-auto mb-12 text-center">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-gradient-to-r from-neon-blue via-white to-neon-pink bg-clip-text text-transparent">
            NEON TRACKER
          </h1>
          <p className="text-neon-blue/50 uppercase tracking-[0.5em] text-xs mt-2 font-bold">Quantum Financial Interface</p>
        </header>

        <main className="max-w-7xl mx-auto">
          <Input />
        </main>
      </div>
    );
  }
}
export default App;
