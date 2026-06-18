import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TeacherProvider } from './hooks/useTeacherMarks'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TeacherProvider>
      <App />
    </TeacherProvider>
  </StrictMode>,
)
