import React from 'react';
import { render } from '@testing-library/react';

import Overview from '../components/Overview.jsx';

describe('Overview', () => {
  test('renders Overview component', () => {
    render(<Overview />);
  });
});