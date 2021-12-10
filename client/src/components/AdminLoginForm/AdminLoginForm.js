import React, { useState } from 'react';
import KFlexBox from '../Styled/KFlexBox';
import KInput from '../Styled/KInput';
import KButton from '../Styled/KButton';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../utils/mutations';
import Auth from '../../utils/auth';
import Loading from '../LoadingOverlay/Loading';

export default function AdminLoginForm() {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const [disabled, setDisabled] = useState(false);
  const [login, { loading }] = useMutation(LOGIN);

  const handleChange = (e) => {
    const newObj = formValues;
    newObj[e.target.id] = e.target.value;
    newObj.email.length > 0 && newObj.password.length > 0
      ? setDisabled(false)
      : setDisabled(true);
    setFormValues(newObj);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formValues },
      });

      Auth.login(data.login.token);

      setFormValues({
        email: '',
        password: '',
      });
    } catch (err) {
      alert('There was an error logging in');
    }
  };

  return (
    <KFlexBox
      width='75%'
      height='300px'
      direction='column'
      evenly
      onChange={handleChange}
    >
      {loading && <Loading />}
      <KInput
        labelColor='white'
        id='email'
        label='Email'
        type='email'
        placeholder='bigboi@example.com'
      />
      <KInput
        labelColor='white'
        id='password'
        label='Password'
        type='password'
        placeholder='Password^123'
      />
      <KButton
        disabled={disabled}
        text='Login'
        onClick={handleSubmit}
        style={{ fontSize: '1.5rem' }}
      />
    </KFlexBox>
  );
}
