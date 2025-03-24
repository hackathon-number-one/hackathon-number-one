import { useState } from "react"
import "./BottomNavigation.css"

// We'll create this file for styling

function BottomNavigation() {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    { id: 0, label: "Home", icon: "🏠" },
    { id: 1, label: "Search", icon: "🔍" },
    { id: 2, label: "Favorites", icon: "❤️" },
    { id: 3, label: "Profile", icon: "👤" },
  ]

  return (
    <div className="bottom-nav-container">
      <div className="bottom-nav">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`nav-item ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <div className="nav-icon">{tab.icon}</div>
            <div className="nav-label">{tab.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BottomNavigation
