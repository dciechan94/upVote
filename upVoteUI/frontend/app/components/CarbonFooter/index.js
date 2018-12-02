import React from 'react';

import LocaleToggle from 'containers/LocaleToggle';
import Wrapper from './Wrapper';


function Footer() {
  return (
    <div>
      <Wrapper>
        <section>
          This is a Footer
        </section>

        <section>
          <LocaleToggle />
        </section>
		  </Wrapper>
	</div>
  );
}

export default Footer;
