import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'  // optional; create if you want

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)
