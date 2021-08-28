import React from 'react'

const Length = ({
    title,
    changeTime,
    type,
    time,
    formatTime,
    idlabel,
    iddecrement,
    idincrement,
    idtitle
}) => {
    return (
        <div className="controls">
            <div className="controls-title" id={idlabel} >{title}</div>
            <div className="controls-buttons">
                <button id={iddecrement}
                    onClick={() => changeTime(-60, type)}
                ><i class="fas fa-arrow-down"></i></button>
                <h3 id={idtitle}>{formatTime(time)}</h3>
                <button id={idincrement}
                    onClick={() => changeTime(60, type)}
                ><i class="fas fa-arrow-up"></i></button>
            </div>
        </div>
    )
}

export default Length
