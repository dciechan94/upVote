import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Card } from '@blueprintjs/core';

import LocaleToggle from 'containers/LocaleToggle';
import messages from './messages';

function Footer() {
  return (
    <Card>
      <div><b><FormattedMessage {...messages.university} /></b></div>
      <br></br>
      <section>ul. Podchorążych 2</section>
      <section>30-084 Kraków</section>
      <br></br>
      <section><FormattedMessage {...messages.chooseLang} />: <LocaleToggle/></section>
    </Card>
  );
}

export default Footer;
