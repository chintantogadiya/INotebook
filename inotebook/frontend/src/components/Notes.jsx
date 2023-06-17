import React from 'react'
import { useContext } from 'react'
import NoteContext from '../context/notecontext'
import { Noteitem } from './Noteitem';


export const Notes = () => {
    const context = useContext(NoteContext);
    // eslint-disable-next-line
    const { notes, setnotes } = context;
  return (
      <div className="row my-3">
          {notes.map((note) => {
              return (
                <Noteitem note={note}/>
              )
          })}
      </div>
  )
}
