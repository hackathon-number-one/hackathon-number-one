import BottomNavigation from "./BottomNavigation"
import { getMap } from "./map"

function App() {
  return (
    <div className="app">
      {getMap()}
      <BottomNavigation />
    </div>
  )
}

export default App
