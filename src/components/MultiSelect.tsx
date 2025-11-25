import React, { useState } from 'react';
import './MultiSelect.css';

interface MultiSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  options: Array<{ label: string; value: string }>;
  placeholder?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Selecione...'
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter(v => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const handleRemove = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(value.filter(v => v !== optionValue));
  };

  const getDisplayText = () => {
    if (value.length === 0) return placeholder;
    if (value.length === 1) {
      return options.find(o => o.value === value[0])?.label || value[0];
    }
    return `${value.length} selecionados`;
  };

  const getChipText = (val: string) => {
    const option = options.find(o => o.value === val);
    return option?.label || val;
  };

  return (
    <div className="multi-select">
      <div 
        className="multi-select-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="multi-select-values">
          {value.length > 0 ? (
            value.map(val => (
              <span key={val} className="multi-select-chip">
                {getChipText(val)}
                <button
                  className="chip-remove"
                  onClick={(e) => handleRemove(val, e)}
                  aria-label="Remover"
                >
                  ×
                </button>
              </span>
            ))
          ) : (
            <span className="multi-select-placeholder">{placeholder}</span>
          )}
        </div>
        <span className="multi-select-arrow">▼</span>
      </div>

      {isOpen && (
        <>
          <div 
            className="multi-select-backdrop"
            onClick={() => setIsOpen(false)}
          />
          <div className="multi-select-dropdown">
            {options.map(option => (
              <label key={option.value} className="multi-select-option">
                <input
                  type="checkbox"
                  checked={value.includes(option.value)}
                  onChange={() => handleToggle(option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
