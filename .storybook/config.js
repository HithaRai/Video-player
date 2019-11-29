import { configure } from '@storybook/react';

configure(require.context('../src/containers', true, /\.stories\.js$/), module);
