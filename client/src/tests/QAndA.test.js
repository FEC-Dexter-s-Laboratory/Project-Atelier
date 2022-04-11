import React from 'react';
import { render } from '@testing-library/react';

import QAndA from '../components/QAndA.jsx';

xdescribe('QAndA', () => {
  test('renders Q&A component', () => {
    render(<QAndA />);
  });
});