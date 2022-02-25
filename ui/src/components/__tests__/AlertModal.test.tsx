import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AlertModal from '../AlertModal';
import 'intersection-observer';

test('calls callback function on delete confirmation', () => {
    const cb = jest.fn();
    const { getByTestId } = render(<AlertModal onCallback={cb} isOpen={true} onClose={() => {}} title="test" description="test" />);

    fireEvent.click(getByTestId('deleteButton'));

    expect(cb).toBeCalled();
});
