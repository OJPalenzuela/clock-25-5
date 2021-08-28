import React, { useState } from "react";
import Length from "./Length";


const Clock = () => {
    const timeInSeg = (num) => {
        return num * 60;
    };
    const timeInMin = (num) => {
        return num / 60;
    };
    const [displayTime, setDisplayTime] = React.useState(timeInSeg(25));
    const [breakTime, setBreakTime] = React.useState(timeInSeg(5));
    const [sessionTime, setSessionTime] = React.useState(timeInSeg(25));
    const [timerOn, setTimerOn] = React.useState(false);
    const [onBreak, setOnBreak] = React.useState(false);
    const [breakAudio, setBreakAudio] = React.useState(
        new Audio("https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3")
    );

    const reproducirBreak = () => {
        breakAudio.currentTime = 0;
        breakAudio.play();
    };

    const formatTime = (time) => {
        const min = Math.floor(time / 60);
        const seg = time % 60;
        return (min < 10 ? "0" + min : min) + ":" + (seg < 10 ? "0" + seg : seg);
    };

    const changeTime = (cantidad, type) => {
        if (type === "break") {
            if (breakTime <= 60 && cantidad < 0 || breakTime >= 3600) {
                return;
            }
            setBreakTime((time) => time + cantidad);
        }
        if (type === "session") {
            if (sessionTime <= 60 && cantidad < 0) {
                return;
            }
            setSessionTime((time) => time + cantidad);

            if (!timerOn) {
                setDisplayTime(sessionTime + cantidad);
            }
        }
    };

    const controlTimer = () => {
        const second = 1000;
        let date = new Date().getTime();
        let nDate = new Date().getTime() + second;
        let onBreakVar = onBreak;
        if (!timerOn) {
            let intervalo = setInterval(() => {
                date = new Date().getTime();
                if (date > nDate) {
                    setDisplayTime((time) => {
                        if (time <= 0 && !onBreakVar) {
                            onBreakVar = true;
                            setOnBreak(true);
                            reproducirBreak();
                            return breakTime;
                        } else if (time <= 0 && onBreakVar) {
                            onBreakVar = false;
                            setOnBreak(false);
                            reproducirBreak();
                            return sessionTime;
                        }
                        return time - 1;
                    });
                    nDate += second;
                }
            }, 30);
            localStorage.clear();
            localStorage.setItem("intervalo-id", intervalo);
        }
        if (timerOn) {
            clearInterval(localStorage.getItem("intervalo-id"));
        }
        setTimerOn(!timerOn);
    };

    const resetTimer = () => {
        setDisplayTime(timeInSeg(25));
        setSessionTime(timeInSeg(25));
        setBreakTime(timeInSeg(5));

        setTimerOn(false);
    };

    const clockify = (time) => {
        let minutes = Math.floor(time / 60);
        let seconds = time - minutes * 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return minutes + ':' + seconds;
    }

    return (
        <div className="timer-main">
            <h1>Clock</h1>
            <div className="div-controls">
                <Length
                    title={"Break Length"}
                    changeTime={changeTime}
                    type={"break"}
                    time={breakTime}
                    formatTime={timeInMin}
                    idlabel={"break-label"}
                    iddecrement={"break-decrement"}
                    idincrement={"break-increment"}
                    idtitle={"break-length"}
                />
                <Length
                    title={"Session"}
                    changeTime={changeTime}
                    type={"session"}
                    time={sessionTime}
                    formatTime={timeInMin}
                    idlabel={"session-label"}
                    iddecrement={"session-decrement"}
                    idincrement={"session-increment"}
                    idtitle={"session-length"}
                />
            </div>

            <div className="timer">
                <div className="timer-wrapper">
                    <div id="timer-label">Session</div>
                    <div id="time-left">{clockify(displayTime)}</div>
                </div>
                <div className="buttons-timer">
                    <button id="start_stop" onClick={() => controlTimer()}>
                        {
                            !timerOn ?
                                (<i class="fas fa-play"></i>) :
                                (<i class="fas fa-pause"></i>)
                        }
                    </button>
                    <button id="reset" onClick={() => resetTimer()}>
                        <i class="fas fa-sync-alt"></i>
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Clock;
