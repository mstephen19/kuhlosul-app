import React, { useState } from 'react';
import { Textarea, Label } from '@rebass/forms';
import { Box } from 'rebass';

export default function KTextArea({
  id,
  label,
  labelColor,
  type,
  placeholder,
  onChange,
  color = 'white',
  maxLength,
  ...props
}) {
  const [count, setCount] = useState(0);

  const handleChange = (e) => {
    setCount(e.target.value.length);
  };

  return (
    <Box style={{ width: '100%', minWidth: '200px', maxWidth: '1000px' }}>
      <Label htmlFor={id} style={{ color: labelColor, fontStyle: 'italic' }}>
        {label}
      </Label>
      <Textarea
        id={id}
        name={type}
        type={type}
        placeholder={placeholder}
        style={{ color: color }}
        onChange={handleChange}
        {...props}
        maxLength={maxLength}
      />
      <p style={{ color: labelColor, fontSize: '1.4rem' }}>
        {count}/{maxLength} characters
      </p>
    </Box>
  );
}
