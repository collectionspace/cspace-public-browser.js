import { connect } from 'react-redux';
import ImageGallery from './ImageGallery';
import { findMedia } from '../../actions/mediaActions';
import { getDetailData, getMedia } from '../../reducers';

const mapStateToProps = (state, ownProps) => ({
  media: getMedia(state, ownProps.referenceValue),
  detailData: getDetailData(state),
});

const mapDispatchToProps = {
  findMedia,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImageGallery);
