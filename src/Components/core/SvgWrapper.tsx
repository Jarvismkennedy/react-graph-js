import React from 'react';
import { margin } from './types';
import useDimensions from './hooks/useDimensions';
export interface SvgWrapperProps {
    width: number;
    height: number;
    margin: margin;
    children: React.ReactNode;
}
// Need to implement Svg version of the graphs. First working on canvas version because its better for print to pdf.
export default function SvgWrapper({ width, height, margin, children }: SvgWrapperProps) {
    const [innerWidth, innerHeight, outerWidth, outerHeight] = useDimensions({
        width,
        height,
        margin,
    });

    return (
        <svg width={outerWidth} height={outerHeight}>
            <rect width={innerWidth} height={innerHeight}>
                {children}
            </rect>
        </svg>
    );
}
