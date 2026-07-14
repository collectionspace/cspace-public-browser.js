import { connect } from 'react-redux';
import Immutable from 'immutable';
import ImageGallery from './ImageGallery';
import { findMedia } from '../../actions/mediaActions';
import { getDetailData, getMedia } from '../../reducers';

const mapStateToProps = (state, ownProps) => {
  const detailData = getDetailData(state);

  let media = getMedia(state, ownProps.referenceValue);

  const mediaPriorityImages = detailData && detailData['collectionspace_denorm:mediaPriorityList'];

  if (mediaPriorityImages && mediaPriorityImages.length > 0) {
    media = (media || Immutable.Map()).set(null, Immutable.fromJS({
      csids: mediaPriorityImages.map((image) => image.csid),
      altTexts: mediaPriorityImages.map((image) => image.altText),
    }));
  }

  return {
    media,
    detailData,
  };
};

const mapDispatchToProps = {
  findMedia,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImageGallery);
