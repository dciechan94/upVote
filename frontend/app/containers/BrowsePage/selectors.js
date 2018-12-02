/**
 * BrowsePage selectors
 */

import { createSelector } from 'reselect';

const selectBrowse = (state) => state.get('browse');

const makeSelectOrganizationId = () => createSelector(
  selectBrowse,
  (browseState) => browseState.get('organizationId')
);

const makeSelectBrowseData = () => createSelector(
  selectBrowse,
  (browseState) => browseState.get('browseData')
);

export {
  selectBrowse,
  makeSelectBrowseData
};
