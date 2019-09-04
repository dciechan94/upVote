import { defineMessages } from 'react-intl';

export const scope = 'app.containers.GenerateTokensPage';

export default defineMessages({
  helmetTitle: {
    id: `${scope}.helmet.title`,
    defaultMessage: 'Generate tokens',
  },
  helmetDescription: {
    id: `${scope}.helmet.description`,
    defaultMessage: 'Fill in the form to generate tokens.',
  },
  tokenCount: {
    id: `${scope}.tokenCount`,
    defaultMessage: 'Count',
  },
  tokenValidInDays: {
    id: `${scope}.tokenValidInDays`,
    defaultMessage: 'Valid in days',
  },
  generateTokens: {
    id: `${scope}.generateTokens`,
    defaultMessage: 'Generate',
  },
  actualTokens: {
    id: `${scope}.actualTokens`,
    defaultMessage: 'Actual tokens',
  },
});
