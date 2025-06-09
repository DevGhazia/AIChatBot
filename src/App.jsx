import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Layout from './Components/Layout'
import Home from './Components/Home'
import Conversation from './Components/Conversation'
import ErrorScreen from './Components/ErrorScreen'

const App = () => {
  return (
    <Routes>
        <Route path='/app' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path=':id' element={<Conversation />} />
        </Route>
        <Route path='/error' element={<ErrorScreen />} />
        <Route path='*' element={<Navigate to="/error"/>}/>
    </Routes>
  )
}

export default App