import React from 'react'
import { useNoteList } from '../../context/NoteListContext'
import { useEffect } from 'react'

import "./styles.css"

import { FaCheck, FaBan } from 'react-icons/fa'
import { useNoteForm } from '../../context/NoteFormContext'
import { useHighlight } from '../../context/HighlightContext'

const NoteForm = () => { 
  const { noteList, setNoteList } = useNoteList()
  const {highlight, setHighlight} = useHighlight()
  const { title, setTitle, description, setDescription, setVisibleForm } = useNoteForm()

  useEffect(() => {
    saveLocalNotes()
  }, [noteList])

  function titleHandler(e) {
    setTitle(e.target.value)
    console.log(title)
  }

  function descriptionHandler(e) {
    setDescription(e.target.value)
    console.log(description)
  }

  function submitHandler(e) {
    e.preventDefault()
    if(highlight) {
      noteList.map((note) => {
        if(note.id === highlight) {
          note.title = title
          note.description = description
        }
      })

      setNoteList([...noteList])
    } else {
      setNoteList([
          ...noteList, 
          {
              id: String(Math.floor(Math.random() * 1000)),
              title,
              description
          }
      ])
    }
  }

  function cancelHandler(e) {
    e.preventDefault()

    setHighlight(false)
    setVisibleForm(false)
  }

  function saveLocalNotes() {
    localStorage.setItem("notes", JSON.stringify(noteList))
  }

  return (
    <form className='note-menu'>
        <div>
            <label htmlFor="title">Título</label>
            <input id="title" value={title} onChange={titleHandler} type="text"placeholder='Informe um título'/>
        </div>
        <div>
            <label htmlFor="note">Nota</label>
            <textarea id="note" value={description} onChange={descriptionHandler} type="text" rows="10" placeholder="Escreva a sua nota" />
        </div>
        <div className='buttons'>
            <button className='cancel' onClick={cancelHandler}>
                <FaBan className='icon' />
            </button>
            <button className='confirm' type='submit' onClick={submitHandler}>
               <FaCheck className='icon' />
            </button>
        </div>
    </form>
  )
}

export default NoteForm