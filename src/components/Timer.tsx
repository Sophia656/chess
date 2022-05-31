import React, { FC, useEffect, useRef, useState } from 'react';
import { Colors } from '../models/Colors';
import { Player } from '../models/Player';

interface TimerProps {
    currentPlayer: Player | null,
    restart: () => void
}

const Timer: FC<TimerProps> = ({currentPlayer, restart}) => {
    const [whiteTime, setWhiteTime] = useState(600)
    const [blackTime, setBlackTime] = useState(600)
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)

    useEffect(() => {
        startTimer()
    }, [currentPlayer])

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
        setBlackTime(600)
        setWhiteTime(600)
    }

    return (
        <div className='timer'>
            <h2>Черные - {blackTime}</h2>
            <h2>Белые - {whiteTime}</h2>
            <div>
                <button onClick={handleRestart}>RESTART GAME</button>
            </div>
        </div>
    );
};

export default Timer;