import React from 'react';
import { render } from '@testing-library/react';

import RelatedList from '../components/RelatedItems/RelatedList.jsx';

describe('RelatedList', () => {
  test('renders Related List component', () => {
    render(<RelatedList />);
  });
});