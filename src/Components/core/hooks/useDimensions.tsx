import { useMemo } from 'react';
import { margin } from '../types';

/** returns [innerWidht, innerHeight, outerWidth, outerHeight] by taking into account the margins */
export default function useDimensions(width: number, height: number, margin: margin) {
    const [innerWidth, innerHeight, outerWidth, outerHeight] = useMemo(() => {
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
        return [innerWidth, innerHeight, width, height];
    }, [width, height, margin]);

    return [innerWidth, innerHeight, outerWidth, outerHeight];
}
