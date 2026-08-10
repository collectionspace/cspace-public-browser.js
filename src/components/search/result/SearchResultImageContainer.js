import { connect } from 'react-redux';
import SearchResultImage from './SearchResultImage';
import { findMedia } from '../../../actions/mediaActions';
import { getMedia } from '../../../reducers';

const mapStateToProps = (state, ownProps) => ({
  media: getMedia(state, ownProps.referenceValue, null),
});

const mapDispatchToProps = {
  findMedia,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResultImage);
