import { useMemo } from 'react';
import { margin } from '../types';

export interface useDimensionsProps {
    width: number;
    height: number;
    margin: margin;
}
export default function useDimensions({ width, height, margin }: useDimensionsProps) {
    const [innerWidth, innerHeight, outerWidth, outerHeight] = useMemo(() => {
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
        return [innerWidth, innerHeight, width, height];
    }, [width, height, margin]);

    return [innerWidth, innerHeight, outerWidth, outerHeight];
}
