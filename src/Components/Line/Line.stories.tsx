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
    margin: { top: 10, left: 10, right: 10, bottom: 10 },
};

export const Secondary = Template.bind({});
Secondary.args = { data: [{ id: 'secondary', data: [] }] };
