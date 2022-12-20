export interface cartesianPoint {
    x: string | number;
    y: string | number;
}
export interface formattedCartesianPoint {
    x: number;
    y: number;
}

export interface Series {
    color?: string;
    lineWidth?: number;
    id: string;
    data: Array<cartesianPoint>;
}
