import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react/types-6-0';
import Line, { LineProps } from './Line';
import { series1, series2 } from './testData';

export default {
    title: 'Components/Line',
    component: Line,
} as Meta;
// Create a master template for mapping args to render the component
const Template: Story<LineProps> = args => <Line {...args} />;

// Reuse that template for creating different stories
export const Primary = Template.bind({});
Primary.args = {
    data: [series1, series2],
    width: 500,
    height: 700,
    margin: { top: 0, left: 0, right: 0, bottom: 0 },
    drawPathConfig: {
        animate: true,
        loop: false,
        durationms: 2000,
    },
};
