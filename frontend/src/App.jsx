import { faMap } from "@fortawesome/free-regular-svg-icons"
import {
  faHouseUser,
  faMugHot,
  faPlus,
  faShieldHalved,
  faUsers,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Map } from "./map"

function App() {
  return (
    <div>
      <div className="flex flex-col items-center p-5 bg-linear-to-r from-blue-600 to-indigo-600 text-white">
        <div className="w-100 max-w-xl">
          <h1 className="text-light text-3xl">
            She<strong>Guardian</strong>
          </h1>
          <h2 className="font-light mb-3">Your safety is our priority</h2>
          <form>
            <input
              type="text"
              id="postcode"
              placeholder="Search by area, e.g. SE8"
              className="w-full px-3 py-2 rounded-full bg-white/80 text-black placeholder:text-blue-600"
            />
          </form>
        </div>
      </div>
      <Map />
      <div className="fixed bottom-0 left-0 flex flex-col items-center right-0 h-1/2 p-5 pt-3 rounded-t-3xl shadow-2xl bg-white">
        <div className="w-100 max-w-xl">
          <hr className="w-12 m-auto border-2 border-gray-300" />
          <h3 className="mb-3 text-2xl">Spots</h3>
          <div className="flex justify-between mb-6">
            <button className="flex flex-col justify-center w-32 h-18 rounded-2xl bg-blue-200 hover:bg-blue-300 cursor-pointer transition-colors">
              <FontAwesomeIcon icon={faMugHot} className="text-2xl opacity-70" />
              Havens
            </button>
            <button className="flex flex-col justify-center w-32 h-18 rounded-2xl bg-indigo-200 hover:bg-indigo-300 cursor-pointer transition-colors">
              <FontAwesomeIcon icon={faHouseUser} className="text-2xl opacity-70" />
              Hubs
            </button>
            <button className="flex flex-col justify-center w-32 h-18 rounded-2xl bg-orange-200 hover:bg-orange-300 cursor-pointer transition-colors">
              <FontAwesomeIcon icon={faShieldHalved} className="text-2xl opacity-70" />
              Safety
            </button>
          </div>
          <div className="mb-6 p-4 border border-gray-300 rounded-2xl text-center">
            <h4 className="text-lg font-semibold">Notify your circle</h4>
            <p className="text-gray-600 text-sm mb-4">
              Send your active location to your close circle
            </p>
            <button className="w-full p-2 rounded-full bg-red-400 hover:bg-red-500 text-white cursor-pointer transition-colors">
              Send Alert
            </button>
          </div>
          <div className="flex justify-evenly px-4 rounded-2xl bg-gray-200">
            <button className="flex flex-col justify-center w-20 py-3 rounded-2xl text-sm cursor-pointer hover:bg-gray-300 transition-colors">
              <FontAwesomeIcon icon={faMap} className="text-2xl opacity-70" />
              Map
            </button>
            <button className="flex flex-col justify-center w-20 py-3 rounded-2xl text-sm cursor-pointer hover:bg-gray-300 transition-colors">
              <FontAwesomeIcon icon={faPlus} className="text-2xl opacity-70" />
              Report
            </button>
            <button className="flex flex-col justify-center w-20 py-3 rounded-2xl text-sm cursor-pointer hover:bg-gray-300 transition-colors">
              <FontAwesomeIcon icon={faUsers} className="text-2xl opacity-70" />
              Support
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
