import { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';

import fetchImages from './fetchImages';

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [imgs, setImgs] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const str = useRef('');

  useEffect(() => {
    const fetchFn = () => {
      if (str.current === inputValue) {
        return;
      }
      setIsLoading(true);

      fetchImages(inputValue, page)
        .then(r => {
          setImgs(prevImgs => [...prevImgs, ...r]);
          if (r.length === 0) {
            toast.error('Упс... по запросу ничего не найдено', {
              autoClose: 1000,
            });
          }
        })
        .catch(e => {
          setError(e.message);
          if (error !== null) {
            toast.error(`Ошибка ${error}`, {
              autoClose: 1000,
            });
          }
        })
        .finally(() => setIsLoading(false));
    };
    fetchFn();
  }, [inputValue, page, error]);

  const handleFormSubmit = value => {
    setInputValue(value);
    setImgs([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <ToastContainer />
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery imgs={imgs} />
      {imgs.length !== 0 && <Button onClick={loadMore} />}
      {isLoading && <Loader />}
    </>
  );
}
