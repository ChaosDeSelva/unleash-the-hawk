import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import FilterHawksForm from '../FilterHawksForm';

test('calls handleSubmit on form submit', () => {
    const handleSubmit = jest.fn();
    const { getByTestId } = render(<FilterHawksForm onFilterHawks={handleSubmit} />);
    const inputValue = "Fire Hawk";

    fireEvent.change(getByTestId('filterInput'), { target: { value: inputValue } });
    fireEvent.click(getByTestId('filterButton'));

    expect(handleSubmit).toBeCalledWith(inputValue);
});
