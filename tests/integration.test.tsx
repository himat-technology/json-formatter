import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';

describe('JSON Formatter Integration', () => {
  it('renders application title and branding', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /JSON Formatter & Validator Online/i })).toBeInTheDocument();
  });

  it('allows pasting raw JSON, formatting, and rendering valid status badge', () => {
    render(<App />);
    const editor = screen.getByLabelText(/Raw JSON Input Editor/i);
    
    fireEvent.change(editor, {
      target: { value: '{"brand":"HiMat","version":1}' },
    });

    expect(screen.getByText('Valid JSON')).toBeInTheDocument();
    
    const formattedOutput = screen.getByLabelText(/Formatted JSON Result/i) as HTMLTextAreaElement;
    expect(formattedOutput.value).toContain('"brand": "HiMat"');
  });

  it('handles invalid JSON error state and triggers auto-repair', () => {
    render(<App />);
    const editor = screen.getByLabelText(/Raw JSON Input Editor/i);
    
    fireEvent.change(editor, {
      target: { value: "{name: 'John', age: 30,}" },
    });

    expect(screen.getByText('Invalid JSON Structure')).toBeInTheDocument();

    const repairBtns = screen.getAllByRole('button', { name: /Auto-Repair/i });
    fireEvent.click(repairBtns[0]);

    expect(screen.getByText('Valid JSON')).toBeInTheDocument();
  });
});
