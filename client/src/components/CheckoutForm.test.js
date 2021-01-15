import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";
import userEvent from '@testing-library/user-event';

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
    // arrange
    render(<CheckoutForm />);

    // act
    const header = screen.getByText(/checkout form/i);

    // assert
    expect(header).toBeInTheDocument();

});

test("form shows success message on submit with form details", async () => {
    // arrange
    render(<CheckoutForm />);

    // act
    // grab user inputs
    const firstNameInput = screen.getByLabelText(/first name/i)
    const lastNameInput = screen.getByLabelText(/last name/i);
    const addressInput = screen.getByLabelText(/address/i);
    const cityInput = screen.getByLabelText(/city/i);
    const stateInput = screen.getByLabelText(/state/i);
    const zipInput = screen.getByLabelText(/zip/i);
    // type into user inputs
    userEvent.type(firstNameInput, 'jessica');
    userEvent.type(lastNameInput, 'brown');
    userEvent.type(addressInput, '123 main st');
    userEvent.type(cityInput, 'tampa');
    userEvent.type(stateInput, 'fl');
    userEvent.type(zipInput, '33626');
    // push the submit button
    const button = screen.getByRole('button');
    userEvent.click(button);

    // assert - form is complete

    const newFullName = await screen.findByText(/jessica/i && /brown/i) 
    const newCompleteAddress = await screen.findByText(/123 main st/i && /tampa/i && /fl/i && /33626/i)
        
    expect(newFullName && newCompleteAddress).toBeInTheDocument();
        

});
