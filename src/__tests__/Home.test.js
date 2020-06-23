import React from 'react';

import Home from '../components/Home';
import { render, fireEvent } from '@testing-library/react';

const USER = {
  username: 'testing'
}

describe('<Home />', () => {
  test('if Home displays the username', () => {
    const { getByRole } = render(<Home user={USER} />);
    
    const heading = getByRole('heading');
    expect(heading.textContent).toEqual(`Yay! You're signed in ${USER.username}!`);
  });

  test('if clicking the button signs the user out', () => {
    const onSignOut = jest.fn();

    const { getByText } = render(<Home onSignOut={onSignOut} user={USER} />);
    const button = getByText('Sign Out');
    fireEvent.click(button);

    expect(onSignOut).toHaveBeenCalled();
  });
});