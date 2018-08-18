/*
 * LoginPage
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Button, Form, TextInput } from 'carbon-components-react';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectRepos, makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import H2 from 'components/H2';
import ReposList from 'components/ReposList';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { loadRepos, loadBaseData } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername, makeSelectFirstName2 } from './selectors';
import reducer from './reducer';
import saga from './saga';

export class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
	this.props.onInitFirstName();
  }

  render() {
    const { loading, error, repos } = this.props;
    const reposListProps = {
      loading,
      error,
      repos,
    };

    return (
      <article>
        <Helmet>
          <title>Sign In</title>
          <meta name="description" content="Authentication for upVote system" />
        </Helmet>

        <Form className="some-class" onSubmit={onSubmit}>
<TextInput
  className="some-class"
  id="test2"
  labelText="Text Input label"
  placeholder="Placeholder text"
/>
<TextInput
  type="password"
  required
  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
  className="some-class"
  id="test3"
  labelText="Password"
/>
<TextInput
  type="password"
  required
  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
  className="some-class"
  id="test4"
  labelText="Password"
  invalid
  invalidText="Your password must be at least 6 characters as well as contain at least one uppercase, one lowercase, and one number."
/>
<TextArea
  labelText="Text Area label"
  className="some-class"
  placeholder="Placeholder text"
  id="test5"
/>
<Button type="submit" className="some-class">
Submit
</Button>
</Form>

        <div>
          <CenteredSection>
            <H2>
              <FormattedMessage {...messages.startProjectHeader} />
            </H2>
            <p>
              <FormattedMessage {...messages.startProjectMessage} />
            </p>
          </CenteredSection>
		  <Button onClick={this.props.onChangeUsername} onFocus={this.props.onChangeUsername} className="bx--btn--primary">
			  xx{this.props.firstNameUI}yy
		  </Button>
          <Section>
            <H2>
              <FormattedMessage {...messages.trymeHeader} />
            </H2>
            <Form onSubmit={this.props.onSubmitForm}>
              <label htmlFor="username">
                <FormattedMessage {...messages.trymeMessage} />
                <AtPrefix>
                  <FormattedMessage {...messages.trymeAtPrefix} />
                </AtPrefix>
                <Input
                  id="username"
                  type="text"
                  placeholder="mxstbr"
                  value={this.props.username}
                  onChange={this.props.onChangeUsername}
                />
              </label>
            </Form>
            <ReposList {...reposListProps} />
          </Section>
        </div>
      </article>
    );
  }
}

LoginPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  repos: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  firstNameUI: PropTypes.object,
  onChangeUsername: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
	onInitFirstName: (evt) => dispatch(loadBaseData()),
  };
}

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  firstNameUI: makeSelectFirstName2(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
