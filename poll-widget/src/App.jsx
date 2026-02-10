import { useState, useEffect } from 'react'
import './App.css'

import PollWidget from './components/PollWidget'

function App() {

  const options = [
    { id: 'option1', label: 'Option 1', value: 0 },
    { id: 'option2', label: 'Option 2', value: 0 }
  ]


  const handleVote = (votes) => {
    console.log("handled Votes", votes)
  }

  const removeVote = (votes) => {
    console.log("Remove Votes", votes)
  }


  return (
    <>
      <PollWidget 
        header={"Poll Widget header"}
        options={options}
        handleVote={handleVote}
        removeVote={removeVote}
        isMultiple={true}
      />
    </>
  )
}

export default App
