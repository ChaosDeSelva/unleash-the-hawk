import React from 'react';
import {render} from '@testing-library/react';
import HawkEditorDialog from '../HawkEditorDialog';
import { HawkEditor } from "../../interfaces/HawkEditor";
import {TWO_HAWKS} from "../__mocks__/TwoHawks";
import 'intersection-observer';

test('renders learn react link', async () => {
    const { getByTestId } = render(<HawkEditorDialog onAddHawk={() => {}} onCloseAddHawk={() => {}} details={{
        isOpen: true,
        hawk: TWO_HAWKS[0]
    } as HawkEditor} />);

    expect(getByTestId('nameInput').getAttribute('value')).toBe(TWO_HAWKS[0].name);
});
