import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RelatedList from '../components/RelatedItems/RelatedList.jsx';
import OutfitList from '../components/RelatedItems/OutfitList.jsx';
import Card from '../components/RelatedItems/Card.jsx';
import Modal from '../components/RelatedItems/Modal.jsx';
import Comparison from '../components/RelatedItems/Comparison.jsx';
import regeneratorRuntime from "regenerator-runtime";

const testProd = {
  "id": "65631",
  "name": "Camo Onesie",
  "category": "Jackets",
  "original_price": "140.00",
  "sale_price": null,
  "photos": [
    {
      "thumbnail_url": "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
      "url": "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
    },
    {
      "thumbnail_url": "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
      "url": "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80"
    },
    {
      "thumbnail_url": "https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
      "url": "https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80"
    },
    {
      "thumbnail_url": "https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      "url": "https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"
    },
    {
      "thumbnail_url": "https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
      "url": "https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
    },
    {
      "thumbnail_url": "https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
      "url": "https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
    }
  ],
  "ratings": {
    "1": "11",
    "2": "9",
    "3": "13",
    "4": "132",
    "5": "41"
  }
};

describe('RelatedList', () => {
  test('renders Related List component', () => {
    render(<RelatedList />);
    expect(screen.getByRole('heading', {name: 'Related Items'})).toBeTrue;
  });
});

// test if related cards are rendered
describe('Card', () => {
  test('renders default card for outfit list', () => {
    render(<Card product={{id: 'default'}} />);
    expect(screen.getByText('Add to Outfit').toBeTrue);
  });

  test('renders image for a product card', () => {
    render(<Card product={testProd}/>);
    expect(screen.getByRole('img').toExist);
  });

  test('renders correct category, name, price for product, and ratings exist', () => {
    render(<Card product={testProd}/>);
    expect(screen.getByText('Camo Onesie').toBeTrue);
    expect(screen.getByText('Jackets').toBeTrue);
    expect(screen.getByText('$140.00').toBeTrue);
    expect(screen.getAllByText('★').toBeTruthy);
  });
});

// test if outfit list renders
describe('OutfitList', () => {
  test('renders Outfit List component', () => {
    render(<OutfitList />);
    expect(screen.getByRole('heading', {name: 'Your Outfit'})).toBeTrue;
  });
});

// test if outfits display in order added

// test if modal shows
describe('ComparisonModal', () => {
  // test('modal shows the children and a close button', () => {
  //   // Arrange
  //   const handleClose = jest.fn()

  //   // Act
  //   const {getByText} = render(
  //     <Modal onClose={handleClose}>
  //       <div>test</div>
  //     </Modal>,
  //   )
  //   // Assert
  //   expect(getByText('test')).toBeTruthy()

  //   // Act
  //   fireEvent.click(getByText(/X/i))

  //   // Assert
  //   expect(handleClose).toHaveBeenCalledTimes(1)
  // })
});

// test if comparison table shows
describe('Comparison Table', () => {
  // test('renders comparison table', async() => {
  //   render(<Comparison mainId={40344} comparedId={40350}/>);
  //   expect(await screen.getByRole('heading', {name: 'Comparing'})).toExist;
  // });
});