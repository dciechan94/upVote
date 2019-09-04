import { defineMessages } from 'react-intl';

export const scope = 'app.containers.TermsPage';

export default defineMessages({
  helmetTitle: {
    id: `${scope}.helmet.title`,
    defaultMessage: 'Terms of Service',
  },
  helmetDescription: {
    id: `${scope}.helmet.description`,
    defaultMessage: 'Read the Terms of Service.',
  },
});
