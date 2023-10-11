import React, { useEffect, useRef } from 'react';
import '../css/popup.css'

const Popup = ({ togglePopup, handleGotItClick, message: { type, content, btn } }) => {
    const popupRef = useRef(null);

    useEffect(() => {
        if (popupRef.current) {
            const contentWidth = popupRef.current.scrollWidth;
            if (contentWidth) {
                popupRef.current.style.width = `${contentWidth}px`;
            }
        }
    }, [type, content]);

    return (
        <div className="popup" ref={popupRef}>
            <div className="popup-header">
                {type}
                <span className="close toggle" onClick={togglePopup}>
                    close
                </span>
            </div>
            <div className="popup-body">
                {content}
            </div>
            <div className="popup-footer">
                <button className="toggle button" onClick={() => { togglePopup(); handleGotItClick() }}>
                    {btn}
                </button>
            </div>
        </div>
    );
};

export default Popup;