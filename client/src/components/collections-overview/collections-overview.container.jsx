import { connect } from "react-redux";
import { compose } from "redux";

import { createStructuredSelector } from "reselect";

import { selectFetching } from "../../redux/shop/shop.selectors";

import WithSpinner from "../with-spinner/with-spinner.component";
import CollectionsOverview from "./collections-overview.component";

const mapStateToProps = createStructuredSelector({
  isLoading: selectFetching
});

const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;
