import React from 'react';
import { Series } from './types';

// This is going to be canvas Line.
// to do: everything... implement canvas rendering methods for every layer.
// should have ability to pass a canvas ref to Line rather than Line generating its own ref
// so that its easier to print to pdf.
// use d-3 to generate the shapes.
// then think of how to do this in 3 dimensions. maybe need to implement my own render methods if d3 doesnt have any.
//

export interface LineProps {
    data: Array<Series>;
}

export default function Line() {
    return null;
}
