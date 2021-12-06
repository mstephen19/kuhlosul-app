import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { CHANGE_PASSWORD } from '../../utils/mutations';
import KInput from '../Styled/KInput';
import KButton from '../Styled/KButton';
import Loading from '../LoadingOverlay/Loading';
import Auth from '../../utils/auth';

export default function PasswordModal(props) {
  const [changePassword, { loading, error, data }] =
    useMutation(CHANGE_PASSWORD);
  const [showPw, toggleShowPw] = useState(false);
  const [password, setPassword] = useState('');

  const handleClick = async () => {
    try {
      if (!Auth.loggedIn()) return;

      const { data } = await changePassword({
        variables: {
          password: password,
        },
      });

      if (!data) return;
      setPassword('');
      props.onHide();
      return alert('Password changed successfully');
    } catch (err) {
      setPassword('');
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
          Change Admin Password
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Enter new password here</h4>
        <KInput
          id='newPassword'
          name='newPassword'
          type={showPw ? 'text' : 'password'}
          placeholder='Password^123'
          onChange={(e) => setPassword(e.target.value)}
          color='black'
        />
        <KButton
          text={!showPw ? 'Show' : 'Hide'}
          onClick={() => toggleShowPw(!showPw)}
        />
        <KButton
          disabled={password.length > 8 ? false : true}
          text='Submit'
          onClick={handleClick}
        />
        <p>
          Must include at least 8 characters, 1 uppercase character, 1 lowercase
          character, 1 number, and 1 symbol.
        </p>
        {error && (
          <p style={{ color: 'red' }}>
            There was an error. Make sure you're following the password
            guidelines above.
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
      {loading && <Loading />}
    </Modal>
  );
}
