import React, { FC, useEffect, useRef, useState } from 'react';
import { Colors } from '../models/Colors';
import { Player } from '../models/Player';

interface TimerProps {
    currentPlayer: Player | null,
    restart: () => void
}

const Timer: FC<TimerProps> = ({currentPlayer, restart}) => {
    const [whiteTime, setWhiteTime] = useState(300)
    const [blackTime, setBlackTime] = useState(300)
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)

    useEffect(() => {
        startTimer()
    }, [currentPlayer])

    useEffect(() => {
        stopTimer()
    }, [whiteTime, blackTime])

    function stopTimer() {
        if (whiteTime === 0) {
            setWhiteTime(0)
            clearInterval(timer.current as NodeJS.Timeout)
        }
        if (blackTime === 0) {
            setBlackTime(0)
            clearInterval(timer.current as NodeJS.Timeout)
        }
    }

    function startTimer() {
        if (timer.current) {
            clearInterval(timer.current)
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
        timer.current = setInterval(callback, 1000)
    }

    function decrementBlackTimer() {
        setBlackTime(prev => prev - 1)
    }

    function decrementWhiteTimer() {
        setWhiteTime(prev => prev - 1)
    }

    const handleRestart = () => {
        restart()
        setBlackTime(300)
        setWhiteTime(300)
        startTimer()
    }

    return (
        <div className='timer'>
            {whiteTime === 0 && <h2>BLACK WINNER!</h2>}
            {blackTime === 0 && <h2>WHITE WINNER!</h2>}
            <h2>Черные - {blackTime}</h2>
            <h2>Белые - {whiteTime}</h2>
            <div>
                <button onClick={handleRestart}>RESTART GAME</button>
            </div>
        </div>
    );
};

export default Timer;