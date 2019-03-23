import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Card } from "@blueprintjs/core";

import A from 'components/A';
import LocaleToggle from 'containers/LocaleToggle';
import Wrapper from './Wrapper';
import messages from './messages';

function Footer() {
  return (
    <Card>
        Footer
        <section>
          Some licences copyrights and others...
        </section>
        <section>
          Locale button: 
          <LocaleToggle />
        </section>
        <section>
          Some footer text
        </section>
    </Card>
    
  );
}

export default Footer;
