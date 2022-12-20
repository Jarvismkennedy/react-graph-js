import { useMemo } from 'react';
import { Series } from '../types';
import {
    getPointFormatter,
    getDefaultColor,
    convertPointToPixelScale,
    getSeriesExtremeValues,
} from '../../core/formatters';

/** returns formatted data series for graphing */
export default function useLineSeriesFormatter(
    data: Array<Series>,
    xFormat: string,
    yFormat: string,
    width: number,
    height: number
) {
    return useMemo(() => {
        const xFormatter = getPointFormatter(xFormat);
        const yFormatter = getPointFormatter(yFormat);
        const formattedSeries = data.map((series, index) => {
            const formattedData = series.data.map(dp => ({
                x: xFormatter(dp.x),
                y: yFormatter(dp.y),
            }));
            return {
                color: series.color || getDefaultColor(index),
                lineWidth: series.lineWidth || 2,
                id: series.id,
                data: formattedData,
            };
        });
        const [maxX, minX, maxY, minY] = getSeriesExtremeValues(
            formattedSeries.map(serie => serie.data)
        );

        return formattedSeries.map((series, index) => {
            return {
                color: series.color,
                lineWidth: series.lineWidth,
                id: series.id,
                data: series.data.map(dp => ({
                    x: convertPointToPixelScale(dp.x - minX, width, maxX - minX),
                    y: height - convertPointToPixelScale(dp.y - minY, height, maxY - minY),
                })),
            };
        });
    }, [data, xFormat, yFormat, width, height]);
}
