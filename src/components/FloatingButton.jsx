import React from 'react';
import '../assets/css/floating.css';
import Note from '../assets/image/note.png'
import Phone from '../assets/image/phone.png'
import Pdf from '../assets/image/pdf.png'
function FloatingButton() {
    const onClick =()=>{
        alert()
    }
    return (
        <div className="floating-button">
            <button className="button" onClick={onClick}>
                <img src={Note} alt="note" />
            </button>
            <button className="button" >
                <img src={Phone} alt="note" />
            </button>
            <button className="button" >
                <img src={Pdf} alt="note" />
            </button>
        </div>
    );
}

export default FloatingButton;
