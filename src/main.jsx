import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { initializeDayjs } from './utils/date.js'

initializeDayjs()

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
