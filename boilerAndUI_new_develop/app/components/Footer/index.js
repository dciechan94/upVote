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
      
        <section>
          <FormattedMessage {...messages.licenseMessage} />
        </section>
        <section>
          <LocaleToggle />
        </section>
        <section>
          <FormattedMessage
            {...messages.authorMessage}
            values={{
              author: <A href="https://twitter.com/mxstbr">Max Stoiber</A>,
            }}
          />
        </section>
    </Card>
    
  );
}

export default Footer;
