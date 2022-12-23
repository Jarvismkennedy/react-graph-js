import { useMemo } from 'react';
import { svgPathProperties } from 'svg-path-properties';
import { FormattedCartesianPoint, FormattedSeries } from './../types';
import { Line } from 'd3-shape';
export default function usePaths(
    series: Array<FormattedSeries>,
    lineRenderer: Line<FormattedCartesianPoint>
) {
    return useMemo(() => {
        return series.map(serie => {
            const path = lineRenderer(serie.data) || '';
            return {
                id: serie.id,
                color: serie.color,
                lineWidth: serie.lineWidth,
                data: serie.data,
                path: path,
                pathLength: new svgPathProperties(path).getTotalLength(),
            };
        });
    }, [lineRenderer, series]);
}
