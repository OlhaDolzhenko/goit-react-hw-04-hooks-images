import { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import SearchBar from './components/SearchBar';
import ImageGallery from './components/ImageGallery';
import Modal from './components/Modal';
import Button from './components/Button';
import API from './services/images-api';
import './App.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

function App() {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalSrc, setModalSrc] = useState('');
  const [modalAlt, setModalAlt] = useState('');
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    if (search === '') {
      return;
    }
    setStatus(Status.PENDING);
    API.fetchImages(search, page)
      .then(data => {
        setImages(data.hits);
        setPage(page => page + 1);
        setStatus(Status.RESOLVED);
      })
      .catch(setStatus(Status.REJECTED));
    scrollDown();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleFetch = () => {
    setStatus(Status.PENDING);

    API.fetchImages(search, page)
      .then(data => {
        setImages(images => [...images, ...data.hits]);
        setPage(page => page + 1);
        setStatus(Status.RESOLVED);
      })
      .catch(setStatus(Status.REJECTED));

    scrollDown();
  };

  const scrollDown = () => {
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 700);
  };

  const handleFormSubmit = search => {
    setPage(1);
    setSearch(search);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onImageClick = event => {
    setModalSrc(event.target.dataset.source);
    setModalAlt(event.target.alt);
    setShowModal(true);
  };

  return (
    <div className="App">
      <SearchBar onSubmit={handleFormSubmit} />
      <ImageGallery images={images} onImageClick={onImageClick} />
      {status === Status.PENDING && (
        <div className="Loader">
          <Loader
            type="Hearts"
            color="#3f51b5"
            height={200}
            width={200}
            timeout={3000}
          />
        </div>
      )}
      {status === Status.RESOLVED && <Button loadMore={handleFetch} />}
      {showModal && (
        <Modal bigImage={modalSrc} alt={modalAlt} onClose={toggleModal} />
      )}
    </div>
  );
}

export default App;
