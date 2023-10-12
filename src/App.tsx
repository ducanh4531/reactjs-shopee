import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useRoutesElement from './hooks/useRoutesElement'

function App() {
  const element = useRoutesElement()

  return (
    <>
      <ToastContainer />
      {element}
    </>
  )
}

export default App
