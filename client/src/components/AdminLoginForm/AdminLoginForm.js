import React, { useState, useEffect } from 'react';
import KFlexBox from '../Styled/KFlexBox';
import KInput from '../Styled/KInput';
import KButton from '../Styled/KButton';

export default function AdminLoginForm() {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const [disabled, setDisabled] = useState(false);

  const handleChange = (e) => {
    const newObj = formValues;
    newObj[e.target.id] = e.target.value;
    newObj.email.length > 0 && newObj.email.length > 0
      ? setDisabled(false)
      : setDisabled(true);
    setFormValues(newObj);
  };

  return (
    <KFlexBox
      width='50%'
      height='300px'
      direction='column'
      evenly
      onChange={handleChange}
    >
      <KInput
        id='email'
        label='Email'
        type='email'
        placeholder='bigboi@example.com'
      />
      <KInput
        id='password'
        label='Password'
        type='password'
        placeholder='Password^123'
      />
      <KButton disabled={disabled} text='Login' onClick={() => alert('hi')} />
    </KFlexBox>
  );
}
