import { useAuth } from 'react-oidc-context'
import './App.css'
import Notes from './Notes'

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
      <div>
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
        <Notes />
      </div>
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