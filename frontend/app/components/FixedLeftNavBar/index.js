import React from 'react';
import { injectIntl } from 'react-intl';
import { Link } from 'react-router-dom'
import { InteriorLeftNav, InteriorLeftNavList, InteriorLeftNavItem } from 'carbon-addons-cloud-react';

import navData from './navBarContent';


class FixedLeftNavBar extends React.Component {

  render() {

    return (
      <InteriorLeftNav>
        {navData.sections.map( (section) => this.renderSection(section) )}
      </InteriorLeftNav>
    );
  }

  renderSection(section) {
    return this.shouldRenderListSection(section) ? 
      this.renderListSection(section) :
      this.renderButtonSection(section)
  }

  shouldRenderListSection(section) {
    return section.sections != null && section.sections.length > 0
  }

  renderListSection(section) {
    return (
      <InteriorLeftNavList title={this.getSectionDisplayTitle(section)} key={section.key}>
        {section.sections.map( (subsection) => this.renderSection(subsection))}
      </InteriorLeftNavList>
    )
  }

  renderButtonSection(section) {
    return (
      <InteriorLeftNavItem href={section.url} key={section.key}>
        <Link to={section.url}>{this.getSectionDisplayTitle(section)}</Link>
      </InteriorLeftNavItem>
    )
  }

  getSectionDisplayTitle(section) {
    if(section.i18n != null && section.i18n.message_key != null) {
      const {formatMessage} = this.props.intl;
      return formatMessage({id: section.i18n.message_key});
    } else {
      return section.title;
    }
  }
  
}

export default injectIntl(FixedLeftNavBar);
