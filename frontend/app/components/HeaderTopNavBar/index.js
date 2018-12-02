import React from 'react';
import { injectIntl } from 'react-intl';
//import { CloudHeader } from 'carbon-addons-cloud-react';

import CloudHeader from './CloudHeader';
import CloudHeaderWrapper from './CloudHeaderWrapper';
import CloudHeaderBrandContainer from './CloudHeaderBrandContainer';
import CloudHeaderBrand from './CloudHeaderBrand';
import CloudHeaderBrandNoMenu from './CloudHeaderBrandNoMenu';
import CloudHeaderBrandText from './CloudHeaderBrandText';
import CloudHeaderBrandTextProduct from './CloudHeaderBrandTextProduct';
import CloudHeaderList from './CloudHeaderList';
import CloudHeaderListItem from './CloudHeaderListItem';
import CloudHeaderListItemButton from './CloudHeaderListItemButton';

import { makeSelectIsUserAuthenticated } from 'containers/App/selectors'


/*
<CloudHeader
          companyName="Uniwersytet Pedagogiczny"
          productName="Vote"
          logoHref="#"
          links={[{href: '#',linkText: 'Tancerze'},{href: '#',linkText: 'Kluby'},{href: '#',linkText: 'Turnieje'}]}
          renderMenu={()=>{}}
  renderSearch={()=>{}}
  renderNotification={()=>{}}
  renderHelp={()=>{}}
  renderUser={()=>{}}
        />	*/

class HeaderTopNavBar extends React.Component {

  componentDidMount() {
    //this.props.isUserLoggedIn = makeSelectIsUserAuthenticated();
  }


  render() {

    //const isUserLoggedIn = makeSelectIsUserAuthenticated();

    //console.log(isUserLoggedIn())

    return (
      <CloudHeader>

        <CloudHeaderWrapper>
          <CloudHeaderBrandContainer>
            <CloudHeaderBrand>
              <CloudHeaderBrandNoMenu>
                <CloudHeaderBrandText>
                  Uniwersytet Pedagogiczny
                  <CloudHeaderBrandTextProduct>
                    &nbsp;Vote
                  </CloudHeaderBrandTextProduct>
                </CloudHeaderBrandText>
              </CloudHeaderBrandNoMenu>
            </CloudHeaderBrand>
          </CloudHeaderBrandContainer>
        </CloudHeaderWrapper>

        <CloudHeaderWrapper>
          <CloudHeaderList>

            <CloudHeaderListItem>
              <CloudHeaderListItemButton>
                <i className="far fa-user-circle"></i>
                &nbsp; Dariusz Ciechanowski
              </CloudHeaderListItemButton>
            </CloudHeaderListItem>

            <CloudHeaderListItem>
              <CloudHeaderListItemButton>
                <i className="far fa-question-circle"></i>
              </CloudHeaderListItemButton>
            </CloudHeaderListItem>

          </CloudHeaderList>
        </CloudHeaderWrapper>

      </CloudHeader>
    );
  }
  
}

export default injectIntl(HeaderTopNavBar);