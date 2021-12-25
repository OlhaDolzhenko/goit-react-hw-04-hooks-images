import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ id, smallImage, bigImage, alt, onImageClick }) => {
  return (
    <li className={s.ImageGalleryItem} key={id}>
      <img
        className={s.ImageGalleryItemImage}
        src={smallImage}
        alt={alt}
        data-source={bigImage}
        onClick={onImageClick}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  smallImage: PropTypes.string,
  bigImage: PropTypes.string,
  alt: PropTypes.string,
  onImageClick: PropTypes.func,
};

export default ImageGalleryItem;
