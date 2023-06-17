import React from 'react'

export const Noteitem = (props) => {
  const { note } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title">{note.title}</h5>
            <div className="icons">
              <i className="fa-regular fa-trash-can mx-2"></i>
              <i className="fa-regular fa-pen-to-square"></i>
            </div>
          </div>
          <p className="card-text">{note.description}</p>
          
        </div>
      </div>
    </div>
  )
}

