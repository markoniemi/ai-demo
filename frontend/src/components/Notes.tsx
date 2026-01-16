import { useEffect, useState } from 'react'
import { useAuth } from 'react-oidc-context'
import { Link } from 'react-router-dom'

interface Note {
  id: number
  text: string
}

function Notes() {
  const auth = useAuth()
  const [notes, setNotes] = useState<Note[]>([])

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('/api/notes', {
          headers: {
            Authorization: `Bearer ${auth.user?.access_token}`,
          },
        })
        if (response.ok) {
          const data = await response.json()
          setNotes(data)
        } else {
          console.error('Failed to fetch notes')
        }
      } catch (error) {
        console.error('Error fetching notes:', error)
      }
    }

    if (auth.isAuthenticated) {
      fetchNotes()
    }
  }, [auth.isAuthenticated, auth.user?.access_token])

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h2>Notes</h2>
        <Link to="/notes/new" className="btn btn-primary">
          Add Note
        </Link>
      </div>
      <ul className="list-group">
        {notes.map((note) => (
          <li
            key={note.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {note.text}
            <Link to={`/notes/${note.id}`} className="btn btn-secondary">
              Edit
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Notes
