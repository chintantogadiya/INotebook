import { useState } from "react";
import NoteContext from "./notecontext";

const NoteState = ({ children }) => {
    const noteInitial = [
        {
            'title': 'my title 1',
            'description': 'my description 1'
        },
        {
            'title': 'my title 2',
            'description': 'my description 2'
        },
        {
            'title': 'my title 3',
            'description': 'my description 3'
        },
        {
            'title': 'my title 4',
            'description': 'my description 4'
        },
        {
            'title': 'my title 5',
            'description': 'my description 5'
        },
    ]
    const [notes, setnotes] = useState(noteInitial);
    return (
        <NoteContext.Provider value={{notes,setnotes}}>
            {children}
        </NoteContext.Provider>
    )
}

export default NoteState;