import React, { useState } from 'react';
import KFlexBox from '../Styled/KFlexBox';
import KButton from '../Styled/KButton';
import { useMutation, useQuery } from '@apollo/client';
import { SEED_DATABASE } from '../../utils/mutations';
import Loading from '../LoadingOverlay/Loading';
import PasswordModal from './PasswordModal';
import NewAdminModal from './NewAdminModal';
import Auth from '../../utils/auth';
import { Modal, Button } from 'react-bootstrap';
import { GET_TRACKS } from '../../utils/queries';
import UpdateAboutModal from './UpdateAboutModal';

// Later on below the update database button, have a list of all tracks currently in the db
export default function AdminPanel() {
  const [seed, { loading }] = useMutation(SEED_DATABASE);
  const tracksRes = useQuery(GET_TRACKS);
  const [modalShow, setModalShow] = useState(false);
  const [adminModalShow, setAdminModalShow] = useState(false);
  const [updateModalShow, setUpdateModalShow] = useState(false);

  const tracks = tracksRes?.data?.tracks || [];
  const allTracksMap = {};
  tracks.forEach((track) => {
    if (!allTracksMap[track.title]) {
      allTracksMap[track.title] = track;
    }
  });
  const allTracks = Object.values(allTracksMap)
    .sort((a, b) => {
      return new Date(b.publishedAt) - new Date(a.publishedAt);
    })
    .filter((track) => {
      return !track.title.toLowerCase().includes('eargsm');
    });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUpdateDb = async () => {
    try {
      setShow(false);
      const { data } = await seed();
      if (!data) return alert('Failed to update database');
      return alert('Database will be updated in the background.');
    } catch (err) {
      alert('Failed to update database.');
    }
  };

  const handleLogOut = () => {
    window.confirm('Are you sure you want to log out?') && Auth.logout();
  };

  return (
    <KFlexBox
      height='calc(100vh - 75px)'
      overflow='hidden'
      wrap
      overflowY='hidden'
    >
      {loading && <Loading />}
      {tracksRes.loading && <Loading />}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: 'auto',
          width: '30%',
          alignItems: 'center',
          textAlign: 'center',
          minWidth: '250px',
          flexGrow: '1',
        }}
      >
        <h2>Admin Functions</h2>
        <KButton
          text='Log Out'
          disabled={false}
          onClick={handleLogOut}
          style={{
            width: '85%',
            marginBottom: '5px',
            background: 'red',
            fontSize: '1.2rem',
          }}
        />
        <KButton
          text='Change Password'
          disabled={false}
          onClick={() => setModalShow(true)}
          style={{ width: '85%', marginBottom: '5px', fontSize: '1.2rem' }}
        />
        <KButton
          text='Create New Admin'
          disabled={false}
          onClick={() => setAdminModalShow(true)}
          style={{ width: '85%', marginBottom: '5px', fontSize: '1.2rem' }}
        />
        <KButton
          text='Update Database'
          disabled={loading ? true : false}
          onClick={handleShow}
          style={{ width: '85%', marginBottom: '5px', fontSize: '1.2rem' }}
        />
        <KButton
          text='Update About Page'
          disabled={false}
          onClick={() => setUpdateModalShow(true)}
          style={{ width: '85%', marginBottom: '5px', fontSize: '1.2rem' }}
        />
      </div>
      <div
        style={{
          width: '70%',
          maxHeight: '100%',
          height: 'auto',
          overflowY: 'scroll',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          minWidth: '350px',
          flexGrow: '1',
        }}
      >
        <h2>Your Tracks</h2>
        {allTracks.map((track) => {
          return (
            <a
              href={track.url}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '90%',
                flexDirection: 'column',
              }}
              key={track._id}
              target='_blank'
              rel='noreferrer'
            >
              <div
                style={{
                  width: '90%',
                  height: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <img
                  src={track.thumbnail}
                  alt={track.title}
                  style={{
                    width: '50px',
                    borderRadius: '5px',
                    objectFit: 'contain',
                  }}
                />
                <p style={{ textAlign: 'center', fontSize: '1.5rem' }}>
                  {track.title}
                </p>
              </div>
              <div
                style={{
                  width: '90%',
                  height: '1px',
                  background: 'white',
                  marginTop: '5px',
                  marginBottom: '5px',
                }}
              ></div>
            </a>
          );
        })}
      </div>

      <PasswordModal show={modalShow} onHide={() => setModalShow(false)} />

      <NewAdminModal
        show={adminModalShow}
        onHide={() => setAdminModalShow(false)}
      />

      {updateModalShow === true && (
        <UpdateAboutModal
          show={updateModalShow}
          onHide={() => setUpdateModalShow(false)}
        />
      )}

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update Database</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to update the database? This function already
          runs automatically in the background every 12 hours.
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            No thanks! Close.
          </Button>
          <Button variant='danger' onClick={handleUpdateDb}>
            Fuck you. Update it.
          </Button>
        </Modal.Footer>
      </Modal>
    </KFlexBox>
  );
}
