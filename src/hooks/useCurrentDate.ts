import { useEffect, useState } from 'react';

export function useCurrentDate(intervalMs: number = 60_000) {
    const [currentDate, setCurrentDate] = useState(() => new Date());

    useEffect(() => {
        const intervalId = window.setInterval(() => {
            setCurrentDate(new Date());
        }, intervalMs);

        return () => {
            window.clearInterval(intervalId);
        };
    }, [intervalMs]);

    return currentDate;
}
