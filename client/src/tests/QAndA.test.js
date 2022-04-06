import React from 'react';
import { render } from '@testing-library/react';

import QAndA from '../components/QAndA.jsx';

describe('QAndA', () => {
  test('renders Q&A component', () => {
    render(<QAndA />);
  });
});