import React, { useState, useEffect } from 'react';
import KFlexBox from '../Styled/KFlexBox';
import KInput from '../Styled/KInput';
import KTextArea from '../Styled/KTextArea';
import KButton from '../Styled/KButton';
import KSelect from '../Styled/KSelect';
import Loading from '../LoadingOverlay/Loading';
import { useMutation } from '@apollo/client';
import { SEND_MESSAGE } from '../../utils/mutations';
import { validateEmail } from '../../utils/validate';
import sendLimit from '../../utils/validate';

export default function ContactForm() {
  const [formValues, setFormValues] = useState({
    email: '',
    type: '',
    subject: '',
    body: '',
  });
  const [err, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const [sendMessage, { loading }] = useMutation(SEND_MESSAGE);

  useEffect(() => {
    loading ? setDisabled(true) : setDisabled(false);
  }, [loading]);

  const handleChange = ({ target }) => {
    const currentState = formValues;
    currentState[target.id] = target.value;
    currentState.email.length > 0 &&
    currentState.subject.length > 0 &&
    currentState.body.length > 0
      ? setDisabled(false)
      : setDisabled(true);
    setFormValues(currentState);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sendLimit.canSend())
      return setError('Can only send a message once per day.');
    if (!validateEmail(formValues.email)) return setError('Email not valid.');
    if (formValues.body.length < 10) return setError('Message body too short.');
    try {
      const { data } = await sendMessage({
        variables: {
          ...formValues,
        },
      });

      setError(null);

      if (!data.sendMessage.status) return setError('Message failed to send.');

      setFormValues({
        email: '',
        type: '',
        subject: '',
        body: '',
      });

      sendLimit.saveSentTime();
      return alert("Message sent. I'll get bat to you as soon as I can!");
    } catch (err) {
      return setError('Error sending message.');
    }
  };

  return (
    <KFlexBox
      width='50%'
      height='auto'
      direction='column'
      evenly
      onChange={handleChange}
    >
      {loading && <Loading />}
      {err && <p style={{ color: 'red', fontSize: '2rem' }}>{err}</p>}
      <KInput
        labelColor='white'
        id='email'
        label='Email'
        type='email'
        placeholder='iLoveKuhlosul@example.com'
      />
      <KSelect
        id='type'
        name='type'
        label='Type'
        labelColor='white'
        options={
          formValues.type === 'Promos'
            ? ['Promos', 'General Inquiries']
            : ['General Inquiries', 'Promos']
        }
      />
      <KInput
        labelColor='white'
        id='subject'
        label='subject'
        type='text'
        placeholder='Subject'
      />
      <KTextArea
        labelColor='white'
        id='body'
        label='body'
        type='text'
        placeholder='Subject'
        style={{ minHeight: '250px' }}
      />
      <KButton
        disabled={disabled}
        text='Submit'
        onClick={handleSubmit}
        style={{ fontSize: '1.5rem' }}
      />
    </KFlexBox>
  );
}
