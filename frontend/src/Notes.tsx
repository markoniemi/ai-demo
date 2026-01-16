import { useEffect, useState } from 'react'
import { useAuth } from 'react-oidc-context'

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
      <h2>Notes</h2>
      <ul className="list-group">
        {notes.map((note) => (
          <li key={note.id} className="list-group-item">
            {note.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Notes
