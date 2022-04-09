import React from 'react';
import { render, screen } from '@testing-library/react';
import RelatedList from '../components/RelatedItems/RelatedList.jsx';
import OutfitList from '../components/RelatedItems/OutfitList.jsx';
import Card from '../components/RelatedItems/Card.jsx';

describe('RelatedList', () => {
  test('renders Related List component', () => {
    render(<RelatedList />);
    expect(screen.getByRole('heading', {name: 'Related Items'})).toExist;
  });
});

// test if related cards are rendered
describe('RelatedCards', () => {
  test('renders Related Card components', () => {
    // render(<Card />);
    // screen.debug;
  });
});

// test if outfit list renders
describe('OutfitList', () => {
  test('renders Outfit List component', () => {
    render(<OutfitList />);
    expect(screen.getByRole('heading', {name: 'Your Outfit'})).toExist;
  });
});

// test if outfits display in order added