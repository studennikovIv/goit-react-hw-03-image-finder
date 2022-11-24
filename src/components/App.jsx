import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import css from './App.module.css';

import API from './API/API';

class App extends Component {
  state = {
    imgName: '',
    imgInfo: [],
    page: 1,
    per_page: 12,
    totalImage: 0,
    modalImage: '',
    modalShow: false,
    largeImageURL: '',
    loader: false,
  };

  componentDidUpdate(_, prevState) {
    const { page, imgName, per_page, modalShow } = this.state;

    if (prevState.imgName !== imgName && imgName !== '') {
      this.setState({ loader: true });
      API(imgName, page, per_page)
        .then(imgArr => {
          this.setState({
            imgInfo: imgArr.data.hits,
            page: 1,
            totalImage: imgArr.data.total,
          });
        })
        .catch(error => console.log(error))
        .finally(() => this.setState({ loader: false }));
    }
    if (prevState.page !== page && prevState.imgName === imgName) {
      this.setState({ loader: true });
      API(imgName, page, per_page)
        .then(imgArr => {
          this.setState(prevState => ({
            imgInfo: [...prevState.imgInfo, ...imgArr.data.hits],
          }));
        })
        .catch(error => console.log(error.message))
        .finally(() => this.setState({ loader: false }));
    }

    if (modalShow) {
      window.addEventListener('keydown', event => {
        if (event.code === 'Escape') {
          this.setState({ modalShow: false });
        }
      });
    }
  }

  searchImages = imgName => {
    this.setState({ imgName, page: 1 });
  };

  modalShow = e => {
    this.setState(currState => ({
      modalShow: false,
    }));
  };
  openModal = (open, largeImageURL) => {
    this.setState({ modalShow: open, largeImageURL: largeImageURL });
  };
  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { totalImage, imgInfo, modalShow, largeImageURL, loader } =
      this.state;
    return (
      <>
        <section className={css.App}>
          <Searchbar searchImages={this.searchImages} />
          <ImageGallery imgInfo={imgInfo} openModal={this.openModal} />

          {modalShow && (
            <Modal modalShow={this.modalShow} largeImageURL={largeImageURL} />
          )}
        </section>
        {totalImage > imgInfo.length && <Button onClick={this.loadMore} />}
        {loader && <Loader />}
      </>
    );
  }
}

export default App;
