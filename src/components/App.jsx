import { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from 'services/api';


export default function App() {
  const [searchQuery, setSearchQuery]= useState('');
  const [page, setPage]= useState(1);
  const [images,setImages]= useState([]);
  const [showModal, setShowModal]= useState(false);
  const [bigImage, setBigImage]= useState('');
  const [visibleButton, setVisibleButton]= useState(false);
  const [loading, setLoading]= useState(false);


useEffect(()=>{
  if(!searchQuery){
    return;
  }
  setLoading(true);
  setVisibleButton(false)
  const pageSise= 12
  api.fetchGallery(searchQuery, page)
  .then(newImages=>{
    if(newImages.total===0){
      setVisibleButton(false);
      toast.warn('Nothing was found on your request')
    }
    if(newImages){
      setImages([...images, ...newImages.hits])
    }
    if(page>1){
      window.scrollTo({
        top:document.body.clientHeight,
        behavior: 'smooth',
      })
    }

    if(newImages.total - page*pageSise < pageSise){
      setVisibleButton(false);
    } else{
      setVisibleButton(true);
    }
  })
  .catch(error => toast.error('Ooops, something went wrong'))
  .finally(()=> setLoading(false));
}, [searchQuery, page])

const toggleModal= () =>{
  setShowModal(!showModal);
}
const getBigImageModal= data =>{
  toggleModal();
  setBigImage(data)
};

const handelFormSubmit= data =>{
  setSearchQuery(data)
  setImages([])
  setPage(1)
  setVisibleButton(true)
}

const handleLoadMore= ()=>{
  setPage(page+1)
}


  return(
      <>
        <Searchbar onSubmit={handelFormSubmit} />
        {images.length !== 0 && (
        <ImageGallery images={images} toggleModal={toggleModal} modalImageLoad={getBigImageModal} />
        )}
        {loading && <Loader/>}
        {visibleButton && <Button onClick={handleLoadMore} />}
        {showModal && <Modal onClick={toggleModal} image={bigImage} />}
        <ToastContainer autoClose={'3000'} theme={'colored'}/>
      </>
     );
};
