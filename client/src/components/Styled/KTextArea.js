import React from 'react';
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
  ...props
}) {
  return (
    <Box style={{ width: '100%', minWidth: '200px' }}>
      <Label htmlFor={id} style={{ color: labelColor, fontStyle: 'italic' }}>
        {label}
      </Label>
      <Textarea
        id={id}
        name={type}
        type={type}
        placeholder={placeholder}
        style={{ color: color, height: '' }}
        onChange={onChange}
        {...props}
      />
    </Box>
  );
}
