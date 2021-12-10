import React, { useState } from 'react';
import KInput from '../Styled/KInput';
import KButton from '../Styled/KButton';
import Loading from '../LoadingOverlay/Loading';
import { Modal, Button } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { CREATE_ADMIN } from '../../utils/mutations';
import Auth from '../../utils/auth';

export default function NewAdminModal(props) {
  const [pwConfirm, setPwConfirm] = useState(null);
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const [createAdmin, { loading, error }] = useMutation(CREATE_ADMIN);

  const handleSecond = ({ target: { value } }) => {
    setPwConfirm(value);
  };

  const handleFormValues = ({ target }) => {
    const currentState = formValues;
    currentState[target.name] = target.value;
    setFormValues(currentState);
  };

  const handleSubmit = async () => {
    try {
      if (!Auth.loggedIn()) return;

      const { data } = await createAdmin({
        variables: {
          email: formValues.email,
          password: formValues.password,
        },
      });

      if (!data) return;

      setFormValues({
        email: '',
        password: '',
      });
      setPwConfirm(null);

      alert(
        `New admin account created with the email of ${data.createAdmin.email}`
      );

      props.onHide();
    } catch (err) {
      return;
    }
  };

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Admin Account Creation
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <KInput
          labelColor='black'
          label='Email'
          id='email'
          name='email'
          type='email'
          placeholder='example@email.com'
          onChange={(e) => handleFormValues(e)}
          color='black'
        />
        <KInput
          labelColor='black'
          label='Password'
          id='password'
          name='password'
          type='password'
          placeholder='Password^123'
          onChange={(e) => handleFormValues(e)}
          color='black'
        />
        <KInput
          labelColor='black'
          label='Password Confirm'
          id='passwordConfirm'
          name='passwordConfirm'
          type='password'
          placeholder='Confirm the password.'
          onChange={handleSecond}
          color='black'
        />
        <p>
          Must include at least 8 characters, 1 uppercase character, 1 lowercase
          character, 1 number, and 1 symbol.
        </p>
        {formValues.password === pwConfirm ? (
          <p style={{ color: 'green' }}>Passwords matching</p>
        ) : (
          <p style={{ color: 'red' }}>Passwords not matching</p>
        )}
        <KButton
          disabled={
            formValues.password !== pwConfirm ||
            formValues.password === '' ||
            pwConfirm === '' ||
            formValues.password.length < 8
              ? true
              : false
          }
          text='Submit'
          onClick={handleSubmit}
        />
        {error && <p style={{ color: 'red' }}>There was an error</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
      {loading && <Loading />}
    </Modal>
  );
}
