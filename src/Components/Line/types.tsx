export interface cartesianPoint {
    x: string | number;
    y: string | number;
}

export interface Series {
    id: string;
    data: Array<cartesianPoint>;
}
