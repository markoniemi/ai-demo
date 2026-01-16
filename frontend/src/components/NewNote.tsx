import { useState } from 'react'
import { useAuth } from 'react-oidc-context'
import { useNavigate } from 'react-router-dom'

function NewNote() {
  const auth = useAuth()
  const navigate = useNavigate()
  const [noteText, setNoteText] = useState('')

  const handleSave = async () => {
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
        body: JSON.stringify({ text: noteText }),
      })

      if (response.ok) {
        navigate('/notes')
      } else {
        console.error('Failed to save note')
      }
    } catch (error) {
      console.error('Error saving note:', error)
    }
  }

  return (
    <div>
      <h2>New Note</h2>
      <div className="mb-3">
        <label htmlFor="noteText" className="form-label">
          Note Text
        </label>
        <textarea
          className="form-control"
          id="noteText"
          rows={3}
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        ></textarea>
      </div>
      <button className="btn btn-primary" onClick={handleSave}>
        Save
      </button>
    </div>
  )
}

export default NewNote
