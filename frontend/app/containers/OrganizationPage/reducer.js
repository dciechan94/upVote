/*
 * OrganizationReducer
*/
import { fromJS } from 'immutable';

import {
  CHANGE_ORGANIZATION_ID,
  LOAD_BASE_DATA,
  LOAD_BASE_DATA_SUCCESS,
  LOAD_BASE_DATA_ERROR,
} from './constants';


// The initial state of the OrganizationPage
const initialState = fromJS({
  organizationId: -1,
  loadingBaseData: true,
  organizationBaseDataJson: {
    name: "<unknown>",
    short_description: "<unknown>",
    rating: 2.5,
    tags: ["<unknown>", "<unknown>", "<unknown>"]
  },

  loadingDetailsData: true,
  organizationDetailDataJson: {
    sections: [
      {
        title: "Oferta",
        short_description: "Short description",
        long_description: "Long description",
        dataTable: {
          rows: [
            {id: "a", name: "Sukienka LA BAS", protocol: "Rozmiar: S", port: "600 PLN"}, 
            {id: "b", name: "Buty LA", protocol: "Rozmiar: 42", port: "260 PLN"}, 
            {id: "c", name: "T-shirt treningowy", protocol: "Rozmiar: XL", port: "80 PLN"}
          ],
          header: [
            {key: "name", header: "Nazwa"}, 
            {key: "protocol", header: "Opis"}, 
            {key: "port", header: "Cena"}]
        }
      },
      {
        title: "Kontakt",
        short_description: "Short description",
        long_description: "Long description",

      }
    ]
  },
});

function organizationReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_ORGANIZATION_ID:
      return state
        .set('organizationId', action.id);

    case LOAD_BASE_DATA:
      return state
        .set('loadingBaseData', true);
	  case LOAD_BASE_DATA_SUCCESS:
      return state
        .set('loadingBaseData', false)
        .set('organizationBaseDataJson', action.jsonData);
	  case LOAD_BASE_DATA_ERROR:
      return state
        .set('loadingBaseData', false);

    case LOAD_DETAIL_DATA:
      return state
        .set('loadingDetailData', true);
    case LOAD_DETAIL_DATA_SUCCESS:
      return state
        .set('loadingDetailData', false)
        .set('organizationDetailDataJson', action.jsonData);
    case LOAD_DETAIL_DATA_ERROR:
      return state
        .set('loadingDetailData', false);

    default:
      return state;
  }
}

export default organizationReducer;
