import React from 'react'
import { useEffect } from 'react'
import { useHighlight } from '../../context/HighlightContext'
import { useNoteForm } from '../../context/NoteFormContext'
import { useNoteList } from '../../context/NoteListContext'
import Note from '../Note'

import './styles.css'

const Notes = () => {
  const { noteList, setNoteList } = useNoteList()
  const { highlight, setHighlight } = useHighlight()
  const { setTitle, setDescription } = useNoteForm()

  useEffect(() => {
    getLocalNotes()
  }, [])

  useEffect(() => {
    if (highlight) {
      const highlightedNote = noteList.find((note) => note.id === highlight)

      setTitle(highlightedNote.title)
      setDescription(highlightedNote.description)
    } else {
      setTitle("")
      setDescription("")
    }
  }, [highlight])

  function getLocalNotes() {
    let localNotes = localStorage.getItem("notes")
    if(localNotes === null) {
      localStorage.setItem("notes", JSON.stringify([]))
    } else {
      localNotes = JSON.parse(localNotes)
      setNoteList(localNotes)
    }
  }

  return (
    <section className='notes'>
        {noteList.map((note) => {
          return (
            <Note 
              key={note.id}
              id={note.id}
              title={note.title}
              description={note.description}
              highlight={highlight}
              setHighlight={setHighlight}
            />
          )
        })}
    </section>
  )
}

export default Notes