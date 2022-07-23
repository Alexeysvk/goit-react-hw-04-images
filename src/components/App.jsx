import { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Error from './Error';
import Modal from './Modal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from 'services/api';


const status = {
  IDLE: 'idle',
  PENDING: 'pending',
  REJECTED: 'rejected',
  RESOLVED: 'resolved',
};


export default class App extends Component{
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    status: status.IDLE,
    error: null,
    showModal: false,
    bigImage: '',
    totalHits: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevImages = prevState.searchQuery;
    const nextImages = this.state.searchQuery;

    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevImages !== nextImages) {
      this.setState({
        status: status.PENDING, page: 1, images: [],
      });
      this.fetchGallery(nextImages, nextPage);
    }

    // Загружаем еще 
    if (prevPage !== nextPage && nextPage !== 1) {
      this.fetchGallery(nextImages, nextPage);
      this.setState({status: "pending"});
    }
  }
  
  fetchGallery(nextImages, nextPage) {
    api.fetchGallery(nextImages, nextPage)
      .then(data => {
        this.setState(prevState => {
          return {
            prevState, status: status.RESOLVED,
            images: [...prevState.images, ...data.hits],
            searchQuery: nextImages,
            totalHits: data.totalHits,
          };
        });
      })
      .catch(error => this.setState({ error, status: status.REJECTED }));
  }

  toggleModal = largeImageURL => {
    this.setState(({ showModal, bigImage }) => ({
      showModal: !showModal,
      bigImage: largeImageURL,
    }));
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handelFormSubmit= searchQuery=>{
   this.setState({searchQuery, page: 1})
  }



  render(){
    const { images, bigImage, status, error } = this.state;

  return(
      <>
        <Searchbar onSubmit={this.handelFormSubmit} />
        <ToastContainer autoClose={3000} theme={'colored'} />
        {images.length !== 0 && 
        <ImageGallery images={images} toggleModal={this.toggleModal} />}

        {status === 'pending' && <Loader/>}

        {status === 'rejeted' && 
        (<>
          <Error message={error.message} />
          <ToastContainer autoClose={3000} theme={'colored'} />
        </>)
        }
        {status === 'resolved' && (
        <div>
             {this.state.showModal && (<Modal image={bigImage} onClickModal={this.toggleModal} />)}
             {this.state.images.length !==this.state.totalHits && (<Button onClick={this.onLoadMore} />)}
             <ToastContainer autoClose={4000} theme={'colored'} />
        </div>)
        }
      </>
     );
  }
};
