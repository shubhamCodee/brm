import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import PrimaryButton from '../Admin/PrimaryButton.js';
describe('<PrimaryButton />', () => {
    it('renders its children correctly', () => {
        render(<PrimaryButton>Click Me</PrimaryButton>);

        const button = screen.getByRole('button', { name: /click me/i });
        expect(button).toBeInTheDocument();
    });

    it('is disabled when the disabled prop is true', () => {
        render(<PrimaryButton disabled={true}>Submit</PrimaryButton>);

        const button = screen.getByRole('button', { name: /submit/i });
        expect(button).toBeDisabled();
    });

    it('applies additional classNames', () => {
        const customClass = 'my-custom-class';

        // Arrange: Render the button with an extra className.
        render(<PrimaryButton className={customClass}>Custom Style</PrimaryButton>);

        // Act & Assert: Find the button and check if it has the new class.
        const button = screen.getByRole('button', { name: /custom style/i });
        expect(button).toHaveClass(customClass);
    });
});
