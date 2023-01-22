import { FormattedCartesianPoint } from '../Line/types';
import { category10 } from './colors';

// need to add support for multiple input types, dates, numbers, etc.
export const getPointFormatter = (format: string) => {
    switch (format) {
        default:
            return (value: number | string) => {
                if (typeof value == 'number') return value;
                return 0;
            };
    }
};

export const convertPointToPixelScale = (
    normalizedValue: number,
    canvasInnerDimension: number,
    dataWidth: number
) => {
    const percentage = normalizedValue / dataWidth;
    return canvasInnerDimension * percentage;
};
export const getDefaultColor = (index: number) => category10[index % category10.length];

/** returns [maxX, minX, maxY, minY] from a 2d array of formatted cartesian points */
export const getSeriesExtremeValues = (seriesArray: Array<Array<FormattedCartesianPoint>>) => {
    const maxX = Math.max(...seriesArray.map(series => Math.max(...series.map(dp => dp.x))));
    const maxY = Math.max(...seriesArray.map(series => Math.max(...series.map(dp => dp.y))));
    const minX = Math.min(...seriesArray.map(series => Math.min(...series.map(dp => dp.x))));
    const minY = Math.min(...seriesArray.map(series => Math.min(...series.map(dp => dp.y))));

    return [maxX, minX, maxY, minY];
};
