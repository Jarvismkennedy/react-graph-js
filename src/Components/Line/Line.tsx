import React, { useEffect } from 'react';
import useDimensions from '../core/hooks/useDimensions';
import usePassedRef from '../core/hooks/usePassedRef';
import { margin } from '../core/types';
import { Series, DrawPathConfig } from './types';
import useLine from './hooks/useLine';
import useLineSeriesFormatter from './hooks/useLineSeriesFormatter';
import usePaths from './hooks/usePaths';
import useDrawLines from './hooks/useDrawLines';

// This is going to be canvas Line.
// to do: everything... implement canvas rendering methods for every layer.
// should have ability to pass a canvas ref to Line rather than Line generating its own ref
// so that its easier to print to pdf.
// use d-3 to generate the shapes.
// then think of how to do this in 3 dimensions. maybe need to implement my own render methods if d3 doesnt have any.
//

export interface LineProps {
    data: Array<Series>;
    width?: number;
    height?: number;
    margin?: margin;
    canvasRef?: React.RefObject<HTMLCanvasElement>;
    curve?: string; // You should list out all the supported curve types here.
    xFormat?: string;
    yFormat?: string;
    durationms?: number;
    lineWidth?: number;
    drawPathConfig: DrawPathConfig;
}

export default function Line({
    data,
    width = 300,
    height = 300,
    margin = { top: 0, bottom: 0, left: 0, right: 0 },
    canvasRef,
    curve = '',
    xFormat = 'number',
    yFormat = 'number',
    drawPathConfig = { loop: false, animate: false, durationms: 1 },
}: LineProps) {
    const [innerWidth, innerHeight, outerWidth, outerHeight] = useDimensions(width, height, margin);
    const elmRef = usePassedRef<HTMLCanvasElement>(canvasRef);
    console.log(outerWidth, outerHeight, width, height);
    // put this all in one hook
    const lineRenderer = useLine(curve);
    const series = useLineSeriesFormatter(data, xFormat, yFormat, innerWidth, innerHeight);
    const paths = usePaths(series, lineRenderer);
    //
    const drawPercentage = useDrawLines(drawPathConfig);

    useEffect(() => {
        const canvas = elmRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        if (!context) return;
        // transform context back to origin before clearing;
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.translate(margin.left, margin.top);
    }, [elmRef, margin.left, margin.top, margin.bottom, margin.right]);

    useEffect(() => {
        const canvas = elmRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        if (!context) return;
        context.clearRect(0, 0, innerWidth, innerHeight);
        paths.forEach(path => {
            context.beginPath();
            context.strokeStyle = path.color;
            context.lineWidth = path.lineWidth;
            context.setLineDash([path.pathLength]);
            context.lineDashOffset = path.pathLength - path.pathLength * drawPercentage;
            const d = new Path2D(path.path);
            context.stroke(d);
        });
    }, [elmRef, paths, drawPercentage, innerWidth, innerHeight]);

    return (
        <canvas
            ref={elmRef}
            width={outerWidth}
            height={outerHeight}
            style={{ border: '1px solid black' }}
        />
    );
}
