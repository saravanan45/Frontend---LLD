import { useState, useEffect, useRef } from 'react'
import './App.css'

const fetchCategoryData = async (category, signal) => {
    return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
            if (signal.aborted) {
                reject(new Error(`Fetch aborted for category already: ${category}`))
            } else {
              console.log("API call completed for category:", category)
                resolve(`Data for ${category}`)
            }
        }, Math.random() * 1000)

        if(signal) {
            signal.addEventListener("abort", () => {
                clearTimeout(timeoutId)
                reject(new Error(`Fetch aborted for category: ${category}`))
            })
        }
    })
}

function App() {
  const [activeCategory, setActiveCategory] = useState("Analytics")
  const [categoryData, setCategoryData] = useState(null)
  const controller = useRef(null);

  // useEffect(() => {

  //   const triggerAPICall = async() => {
  //     controller.current?.abort();
  //     controller.current = new AbortController();
  //     const signal = controller.current.signal;
  //     try {
  //       const result = await fetchCategoryData(activeCategory, signal)
  //       setCategoryData(result)
  //     } catch (err) {
  //       console.error(err)
  //       // setError(err.message)
  //     }
  //   }

  //   triggerAPICall();

  //   return () => controller.current.abort();
  // }, [activeCategory])

  const handleClick = async(e) => {
    setActiveCategory(e.target.innerText)

    if(controller.current) {
      controller.current.abort();
    }

    controller.current = new AbortController();
    const { signal } = controller.current;
    try {
      const result = await fetchCategoryData(activeCategory, signal)
      setCategoryData(result)
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <>
      <div style={{ display: "flex", gap: "10px" }} onClick={handleClick}>
          <button>Analytics</button>
          <button>Settings</button>
          <button>Profile</button>

          {categoryData && <div>{categoryData}</div>}
      </div>
    </>
  )
}

export default App
