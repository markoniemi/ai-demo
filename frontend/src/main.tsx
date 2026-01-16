import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from 'react-oidc-context'
import App from './components/App.tsx'
import './index.css'

const oidcConfig = {
  authority: "http://localhost:9000",
  client_id: "messaging-client",
  redirect_uri: "http://localhost:5173",
  onSigninCallback: (_user: any | void) => {
    window.history.replaceState({}, document.title, window.location.pathname)
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)