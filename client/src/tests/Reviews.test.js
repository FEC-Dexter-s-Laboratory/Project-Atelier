import React from 'react';
import { render } from '@testing-library/react';

import Reviews from '../components/Reviews/Reviews.jsx';

xdescribe('Reviews', () => {
  test('renders Reviews component', () => {
    render(<Reviews />);
  });
});