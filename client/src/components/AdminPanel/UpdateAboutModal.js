import React, { useState, useEffect } from 'react';
import KInput from '../Styled/KInput';
import KButton from '../Styled/KButton';
import KTextArea from '../Styled/KTextArea';
import Loading from '../LoadingOverlay/Loading';
import { Modal, Button } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ABOUT, VIEW_DASHBOARD } from '../../utils/queries';
import { UPDATE_ABOUT } from '../../utils/mutations';
import Auth from '../../utils/auth';

export default function UpdateAboutModal({ ...props }) {
  const [formValues, setFormValues] = useState({
    header: '',
    body: '',
  });
  const query = useQuery(GET_ABOUT);
  const adminCheck = useQuery(VIEW_DASHBOARD);
  const [sendAboutData, { loading, error }] = useMutation(UPDATE_ABOUT, {
    update(cache, { data: { updateAbout } }) {
      try {
        const { getAbout } = cache.readQuery({ query: GET_ABOUT });

        cache.writeQuery({
          query: GET_ABOUT,
          data: {
            getAbout: {
              ...getAbout,
              body: updateAbout.body,
              header: updateAbout.header,
            },
          },
        });
      } catch (err) {
        console.error(err);
      }
    },
  });
  const isAdmin = adminCheck.data?.viewdashboard?.isAdmin || false;

  useEffect(() => {
    const obj = query.data?.getAbout || {};

    setFormValues({ header: obj.header, body: obj.body });
  }, [query.data]);

  const handleFormValues = ({ target }) => {
    const currentState = formValues;
    formValues[target.id] = target.value;

    setFormValues(currentState);
  };

  const handleSubmit = async () => {
    if (!Auth.loggedIn() || !isAdmin)
      return alert(
        'Authentication error. Try logging out then logging in again.'
      );
    try {
      const { data } = await sendAboutData({
        variables: {
          ...formValues,
        },
      });

      if (!data) return;

      props.onHide();
      return alert('Success!');
    } catch (err) {
      alert('Request error.');
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
          style={{ color: 'black', minHeight: 'clamp(100px, 30vh, 300px)' }}
          defaultValue={formValues.body}
          maxLength={2500}
        />
        <KButton disabled={false} text='Submit' onClick={handleSubmit} />
        {query.error || isAdmin.error || error ? (
          <p style={{ color: 'red' }}>There was an error somewhere.</p>
        ) : null}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
      {query.loading || isAdmin.loading || loading ? <Loading /> : null}
    </Modal>
  );
}
