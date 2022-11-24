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
    totalImage: 0,
    modalShow: false,
    largeImageURL: '',
    loader: false,
  };

  componentDidUpdate(_, prevState) {
    const { page, imgName, per_page } = this.state;

    if (
      (prevState.imgName !== imgName && imgName !== '') ||
      prevState.page !== page
    ) {
      this.setState({ loader: true });
      API(imgName, page, per_page)
        .then(imgArr => {
          this.setState({
            imgInfo: [...prevState.imgInfo, ...imgArr.data.hits],
            totalImage: imgArr.data.total,
          });
        })
        .catch(error => console.log(error))
        .finally(() => this.setState({ loader: false }));
    }
  }

  searchImages = imgName => {
    this.setState({ imgName, page: 1, imgInfo: [] });
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
  onKeyPress(e) {
    console.log(e);
  }

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
