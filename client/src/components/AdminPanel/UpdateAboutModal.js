import React, { useState, useEffect } from 'react';
import KInput from '../Styled/KInput';
import KButton from '../Styled/KButton';
import KTextArea from '../Styled/KTextArea';
import Loading from '../LoadingOverlay/Loading';
import { Modal, Button } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ABOUT } from '../../utils/queries';
import Auth from '../../utils/auth';

export default function UpdateAboutModal({ ...props }) {
  const [formValues, setFormValues] = useState({
    header: '',
    body: '',
  });
  const query = useQuery(GET_ABOUT);

  useEffect(() => {
    const obj = query.data?.getAbout || {};

    setFormValues({ header: obj.header, body: obj.body });
  }, [query.data]);

  const handleFormValues = ({ target }) => {
    const currentState = formValues;
    formValues[target.id] = target.value;

    setFormValues(currentState);
  };

  const handleSubmit = () => {
    console.log(formValues);
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
          Update "About" Page
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <KInput
          labelColor='black'
          label='Header'
          id='header'
          name='header'
          type='header'
          placeholder='I am Kuhlosul'
          onChange={(e) => handleFormValues(e)}
          color='black'
          defaultValue={formValues.header}
        />
        <KTextArea
          labelColor='black'
          label='Body'
          id='body'
          name='body'
          type='body'
          placeholder='I am a cool guy!'
          onChange={(e) => handleFormValues(e)}
          color='black'
          style={{ color: 'black' }}
          defaultValue={formValues.body}
        />
        <KButton disabled={false} text='Submit' onClick={handleSubmit} />
        {query.error && <p style={{ color: 'red' }}>There was an error</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
      {query.loading && <Loading />}
    </Modal>
  );
}
