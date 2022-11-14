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
    per_page: 20,
    totalImage: 0,
    modalImage: '',
    modalShow: false,
    largeImageURL: '',
    loader: true,
  };
  componentDidMount() {
    this.setState({ loader: false });
  }
  componentDidUpdate(_, prevState) {
    const { page, per_page, imgName } = this.state;
    const prevImgName = prevState.imgName;

    if (prevImgName !== imgName) {
      API(imgName, page, per_page)
        .then(imgArr => {
          this.setState({ imgInfo: imgArr.data.hits });
        })
        .catch(error => console.log(error))
        .finally(this.setState({ loader: false }));
    }
    if (prevImgName !== imgName || per_page !== prevState.per_page) {
      API(imgName, page, per_page)
        .then(imgArr => {
          this.setState({
            imgInfo: imgArr.data.hits,
            totalImage: imgArr.data.total,
          });
        })
        .catch(error => console.log(error))
        .finally(() => this.setState({ loader: false }));
    }
  }

  searchImages = imgName => {
    this.setState({ imgName, per_page: 20, loader: true });
  };

  modalShow = e => {
    this.setState(currState => ({
      modalShow: !currState.modalShow,
    }));
  };
  openModal = (open, largeImageURL) => {
    this.setState({ modalShow: open, largeImageURL: largeImageURL });
  };
  loadMore = () => {
    this.setState(prevState => ({
      per_page: prevState.per_page + 20,
      loader: true,
    }));
  };
  render() {
    const { totalImage, imgInfo, per_page, modalShow, largeImageURL, loader } =
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
        {totalImage > per_page && <Button onClick={this.loadMore} />}
        {loader && <Loader />}
      </>
    );
  }
}

export default App;
