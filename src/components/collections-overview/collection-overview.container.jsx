import { connect } from "react-redux";
import { compose } from "react";

import { createStructuredSelector } from "reselect";

import { selectFetching } from "../../redux/shop/shop.selectors";

import WithSpinner from "../with-spinner/with-spinner.component";
import CollectionsOverview from "./collections-overview.component";
