import React from 'react'
import { useState, useContext, createContext } from 'react'

const NoteListContext = createContext()

export default function NoteListProvider({ children }) {
  const [noteList, setNoteList] = useState([])  

  return (
    <NoteListContext.Provider value={{noteList, setNoteList}}>
        {children}
    </NoteListContext.Provider>
  )
}

export function useNoteList() {
    const context = useContext(NoteListContext)
    const { noteList, setNoteList } = context
    return { noteList, setNoteList }
}