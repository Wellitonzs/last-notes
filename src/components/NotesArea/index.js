import React from 'react'
import { useNoteForm } from '../../context/NoteFormContext'
import NoteForm from '../NoteForm'

import "./styles.css"

const NotesArea = ({ children }) => {
  const { visibleForm } = useNoteForm()

  return (
    <article className='notes-area'>
      {children}
      {visibleForm && <NoteForm />}
    </article>
  )
}

export default NotesArea