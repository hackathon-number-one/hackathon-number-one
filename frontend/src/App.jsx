import { getMap } from "./map"

function App() {
  return (
    <div className="app">
      <h3>My Google Maps Demo</h3>
      {getMap()}
    </div>
  )
}

export default App
