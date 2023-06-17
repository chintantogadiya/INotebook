import './App.css';
import Navbar from './components/Navbar';
import React from 'react'
import { Home } from './components/Home';
import NoteState from './context/notestate';

const App = () => {
  return (
    <>
    <NoteState>
      <Navbar />
      <Home/>
      </NoteState>
    </>
  )
}

export default App;
