import './App.css'
import React from 'react'

const Button = React.lazy(() => import('remote1/Button'))

function App() {

  return (
    <>
      <section>
         Shell Application
      </section>
      <Button />
    </>
  )
}

export default App
