
import React from 'react';
import { act, render, fireEvent } from '@testing-library/react';
import { signUserIn } from '../utils/sign-in';

import SignInForm from '../components/SignInForm';

jest.mock('../utils/sign-in', () => ({
  signUserIn: jest.fn()
}));


describe('<SignInForm />', () => {
  let onSubmit = jest.fn();

  beforeEach(() => {
    signUserIn.mockImplementation(() => Promise.resolve({
      statusCode: 200,
      user: {
        username: 'test'
      }
    }));
    onSubmit.mockReset();
  })

  test('if clicking the sign in button signs the user in', async () => {
    const { getByText } = render(<SignInForm onSubmit={onSubmit} />);

    const button = getByText('Sign In');
    await act(async () => {
      await fireEvent.click(button);
    });

    expect(onSubmit).toHaveBeenCalled();
  });

  test('if SignIn shows an error when sign in fails', async () => {
    signUserIn.mockImplementation(() => Promise.reject({
      statusCode: 400,
      message: 'This failed dude!'
    }));

    const { getByText } = render(<SignInForm onSubmit={onSubmit} />);

    const signInButton = getByText('Sign In');
    await act(async () => {
      await fireEvent.click(signInButton);
    });

    expect(getByText('This failed dude!')).not.toBeNull();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  test('if SignIn shows a loading animation while waiting for sign in to complete', async () => {
    const { getByText } = render(<SignInForm onSubmit={onSubmit} />);

    const button = getByText('Sign In');
    expect.assertions(1);

    await act(async () => {
      await fireEvent.click(button);
      expect(getByText('loading...')).not.toBeNull();
    });
  });
});