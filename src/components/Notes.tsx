import { getNotes } from '@/services/notes'
import React from 'react'

const Notes = async () => {
    const notes = await getNotes();

  return (
    <div>
      <pre>{JSON.stringify(notes, null, 2)}</pre>
    </div>
  )
}

export default Notes
