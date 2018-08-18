/**
 * OrganizationPage selectors
 */

import { createSelector } from 'reselect';

const selectOrganization = (state) => state.get('organization');

const makeSelectOrganizationId = () => createSelector(
  selectOrganization,
  (organizationState) => organizationState.get('organizationId')
);

const makeSelectOrganizationBaseDataJson = () => createSelector(
  selectOrganization,
  (organizationState) => organizationState.get('organizationBaseDataJson')
);

export {
  selectOrganization,
  makeSelectOrganizationId,
  makeSelectOrganizationBaseDataJson,
};
