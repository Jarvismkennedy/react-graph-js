import React, { useEffect } from 'react';
import useDimensions from '../core/hooks/useDimensions';
import usePassedRef from '../core/hooks/usePassedRef';
import { margin } from '../core/types';
import { Series } from './types';
import useLine from './hooks/useLine';
import useLineSeriesFormatter from './hooks/useLineSeriesFormatter';

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
}: LineProps) {
    const [innerWidth, innerHeight, outerWidth, outerHeight] = useDimensions(width, height, margin);
    const elmRef = usePassedRef<HTMLCanvasElement>(canvasRef);

    const lineRenderer = useLine(curve);
    const series = useLineSeriesFormatter(data, xFormat, yFormat, innerWidth, innerHeight);

    useEffect(() => {
        const canvas = elmRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        if (!context) return;
        context.translate(margin.left, margin.top);
        lineRenderer.context(context);
        series.forEach(serie => {
            context.strokeStyle = serie.color;
            context.lineWidth = serie.lineWidth;
            context.beginPath();
            lineRenderer(serie.data);
            context.stroke();
        });
    }, [data, elmRef, lineRenderer, series]);

    return (
        <canvas
            ref={elmRef}
            width={outerWidth}
            height={outerHeight}
            style={{ border: '1px solid black' }}
        />
    );
}
