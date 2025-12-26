import React from 'react'
import Sidebar from './components/Sidebar.jsx'
import Chatbox from './components/Chatbox.jsx'
import Credits from './pages/Credits.jsx'
import Community from './pages/Community.jsx'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
  <>
  <div className="w-screen h-screen dark:bg-gradient-to-r dark:from-[#b068b0] dark:to-[#000000]
  dark:text-white">
    <div className="flex h-screen w-screen">
        <Sidebar />

        <Routes>
          <Route path="/" element={<Chatbox />} />
          <Route path="/credits" element={<Credits />} />
          <Route path="/community" element={<Community />} />
        </Routes>
      </div>
    </div>
    </>
  )
}

export default App
