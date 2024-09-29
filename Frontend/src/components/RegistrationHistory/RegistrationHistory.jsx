import Sliderbar from "../Welcome/Sliderbar"
import Records from "./Records"

const RegistrationHistory = () => {
  return (
    <div className="dashBoard flex h-screen">
    <Sliderbar/>
    <div className="flex-grow p-4">
      <Records />
    </div>
  </div>
  )
}

export default RegistrationHistory