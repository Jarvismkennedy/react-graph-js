export interface CartesianPoint {
    x: string | number;
    y: string | number;
}
export interface FormattedCartesianPoint {
    x: number;
    y: number;
}

export interface Series {
    color?: string;
    lineWidth?: number;
    id: string;
    data: Array<CartesianPoint>;
}
export interface FormattedSeries {
    color: string;
    lineWidth: number;
    id: string;
    data: Array<FormattedCartesianPoint>;
}
export interface DrawPathConfig {
    animate: boolean;
    durationms: number;
    loop: boolean;
}

export interface Path {
    id: string;
    color: string;
    lineWidth: number;
    data: FormattedCartesianPoint[];
    path: string;
    pathLength: number;
}
