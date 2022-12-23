import { useMemo } from 'react';
import { line, curveCatmullRomClosed } from 'd3-shape';
import { FormattedCartesianPoint } from '../types';

const getCurveFactory = (curveType: string) => {
    switch (curveType) {
        default:
            return curveCatmullRomClosed;
    }
};
/** returns a d3-line function to generate the lines */
export default function useLine(curveType: string) {
    return useMemo(() => {
        return line<FormattedCartesianPoint>()
            .defined(d => d.x !== null && d.y !== null)
            .x(d => d.x)
            .y(d => d.y)
            .curve(getCurveFactory(curveType));
    }, [curveType]);
}
