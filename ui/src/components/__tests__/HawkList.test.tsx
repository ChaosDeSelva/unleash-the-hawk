import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import HawkList from '../HawkList';
import { TWO_HAWKS } from "../__mocks__/TwoHawks";

describe('HawkList', () => {
    beforeEach(() => {
        window.fetch = jest.fn();
        // @ts-ignore
        window.fetch.mockResolvedValue({
            status: 200,
            json: async () => {
                return {
                    hawks: TWO_HAWKS
                };
            }
        })
    })

    test('renders name of Red Tail Hawk in list', async () => {
        render(<HawkList/>);
        await waitFor(() => screen.getByText(TWO_HAWKS[1].name))
        expect(screen.getByText(TWO_HAWKS[1].name)).toBeInTheDocument();
    });

    test('renders name of Fire Hawk in list', async () => {
        render(<HawkList/>);
        await waitFor(() => screen.getByText(TWO_HAWKS[0].name))
        expect(screen.getByText(TWO_HAWKS[0].name)).toBeInTheDocument();
    });
});


