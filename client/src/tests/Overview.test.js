import React from 'react';
import { render } from '@testing-library/react';

import Overview from '../components/Overview/Overview.jsx';

xdescribe('Overview', () => {
  test('renders Overview component', () => {
    render(<Overview />);
  });
});