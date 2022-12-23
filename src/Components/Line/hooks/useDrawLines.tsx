import { useState, useEffect } from 'react';
import { DrawPathConfig } from '../types';
const stepSizems = 10;

export default function useDrawLines(drawPathConfig: DrawPathConfig) {
    const [percentage, setPercentage] = useState(1);

    useEffect(() => {
        if (!drawPathConfig.animate) return setPercentage(1);
        let currentDuration = 0;
        const interval = setInterval(() => {
            if (currentDuration >= drawPathConfig.durationms) {
                if (drawPathConfig.loop) {
                    currentDuration = 0;
                } else {
                    clearInterval(interval);
                }
            }
            currentDuration += stepSizems;
            setPercentage(currentDuration / drawPathConfig.durationms);
        }, stepSizems);

        return () => {
            clearInterval(interval);
        };
    }, [drawPathConfig]);
    return percentage;
}
