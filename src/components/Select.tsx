import React, { useState } from 'react';
import './Select.css';

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ label: string; value: string }>;
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Selecione...'
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedOption = options.find(o => o.value === value);

  return (
    <div className="custom-select">
      <div 
        className="select-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={!value ? 'select-placeholder' : ''}>
          {selectedOption?.label || placeholder}
        </span>
        <span className="select-arrow">▼</span>
      </div>

      {isOpen && (
        <>
          <div 
            className="select-backdrop"
            onClick={() => setIsOpen(false)}
          />
          <div className="select-dropdown">
            {options.map(option => (
              <div
                key={option.value}
                className={`select-option ${value === option.value ? 'selected' : ''}`}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
