import React from 'react';
import { render } from '@testing-library/react';
import HawkDetailsDialog from '../HawkDetailsDialog';
import { Hawk } from "../../interfaces/Hawk";
import 'intersection-observer';

test('renders name fire hawk from details', () => {
    const { getByText } = render(<HawkDetailsDialog clearData={() => {}} reloadHawkList={() => {}} details={{
        id: 1,
        name: 'Fire Hawk'
    } as Hawk} />);
    const linkElement = getByText(/Fire Hawk/i);
    expect(linkElement).toBeInTheDocument();
});
