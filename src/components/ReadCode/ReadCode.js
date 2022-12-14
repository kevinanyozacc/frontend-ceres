import { Route, Routes } from 'react-router-dom'
import CodeConfirmation from './CodeConfirmation'
import CodeScanner from './CodeScanner'
import './ReadCode.css'

const ReadCode = () => {
  return (
    <div className="ReadCode">
      <Routes>
        <Route path="confirmacion/:code" element={<CodeConfirmation />} />
        <Route path="/" element={<CodeScanner />} />
      </Routes>
    </div>
  )
}

export default ReadCode