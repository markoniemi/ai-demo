import { useAuth } from 'react-oidc-context'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import '../App.css'
import Notes from './Notes'
import NoteEdit from './NoteEdit'
import NewNote from './NewNote'

function App() {
  const auth = useAuth()

  switch (auth.activeNavigator) {
    case 'signinSilent':
      return <div>Signing in...</div>
    case 'signoutRedirect':
      return <div>Signing out...</div>
  }

  if (auth.isLoading) {
    return <div>Loading...</div>
  }

  if (auth.error) {
    return <div className="alert alert-danger">{auth.error.message}</div>
  }

  if (auth.isAuthenticated) {
    return (
      <BrowserRouter>
        <div className="d-flex justify-content-between align-items-center">
          <span>Hello {auth.user?.profile.sub}</span>
          <button
            className="btn btn-primary"
            onClick={() => void auth.removeUser()}
          >
            Log out
          </button>
        </div>
        <hr />
        <Routes>
          <Route path="/" element={<Navigate to="/notes" />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/notes/new" element={<NewNote />} />
          <Route path="/notes/:id" element={<NoteEdit />} />
        </Routes>
      </BrowserRouter>
    )
  }

  return (
    <div className="text-center">
      <button
        className="btn btn-primary"
        onClick={() => void auth.signinRedirect()}
      >
        Log in
      </button>
    </div>
  )
}

export default App
