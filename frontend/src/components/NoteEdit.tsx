import { useEffect, useState } from 'react'
import { useAuth } from 'react-oidc-context'
import { useParams, useNavigate } from 'react-router-dom'

function NoteEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const auth = useAuth()
  const [text, setText] = useState('')

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`/api/notes/${id}`, {
          headers: {
            Authorization: `Bearer ${auth.user?.access_token}`,
          },
        })
        if (response.ok) {
          const data = await response.json()
          setText(data.text)
        } else {
          console.error('Failed to fetch note')
        }
      } catch (error) {
        console.error('Error fetching note:', error)
      }
    }

    if (auth.isAuthenticated) {
      fetchNote()
    }
  }, [id, auth.isAuthenticated, auth.user?.access_token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
        body: JSON.stringify({ text }),
      })
      if (response.ok) {
        navigate('/notes')
      } else {
        console.error('Failed to update note')
      }
    } catch (error) {
      console.error('Error updating note:', error)
    }
  }

  return (
    <div>
      <h2>Edit Note</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="text" className="form-label">
            Text
          </label>
          <textarea
            id="text"
            className="form-control"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  )
}

export default NoteEdit
