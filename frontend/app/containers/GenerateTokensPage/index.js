import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import {
  Button,
  Card,
  FormGroup,
  InputGroup,
  Intent,
  TextArea,
} from "@blueprintjs/core";

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { changeTokenCount, changeTokenValidInDays, generateTokens, fetchActualTokens } from './actions';
import { makeSelectTokenCount, makeSelectTokenValidInDays, makeSelectActualTokens, makeSelectNewTokens } from './selectors'


const key = 'generateTokens';

export function GenerateTokensPage({
  intl,
  // model
  tokenCount,
  tokenValidInDays,
  actualTokens,
  newTokens,

  // validation

  // actions
  onChangeTokenCount,
  onChangeTokenValidInDays,
  onGenerateTokens,
  onFetchActualTokens,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    onFetchActualTokens()
  }, []);


  const {formatMessage} = intl;

  return (
    <div>
      <Helmet>
        <title>{formatMessage(messages.helmetTitle)}</title>
        <meta
          name="description"
          content={formatMessage(messages.helmetDescription)}
        />
      </Helmet>
      <Card>
        <Card style={{margin: "auto", width: 800}}>
          <FormGroup
            label={formatMessage(messages.tokenCount)}
            labelFor="tokenCount-input"
          >
            <InputGroup
              id="tokenCount-input"
              onChange={onChangeTokenCount}
            />
          </FormGroup>

          <FormGroup
            label={formatMessage(messages.tokenValidInDays)}
            labelFor="tokenValidInDays-input"
          >
            <InputGroup
              id="tokenValidInDays-input"
              onChange={onChangeTokenValidInDays}
            />
          </FormGroup>

          <Button text={formatMessage(messages.generateTokens)} onClick={onGenerateTokens}/>
          <br></br>
          <br></br>
          <br></br>
          <FormGroup
            label = {formatMessage(messages.actualTokens)}
            labelFor = "actualTokens-form">

            <TextArea
              fill = {true}
              growVertically={true}
              large={true}
              intent={Intent.NONE}
              value={actualTokens.map(item => item.code +"("+item.validDays+")").join(', ')}
            />
          </FormGroup>


        </Card>
      </Card>
    </div>
  );
}

GenerateTokensPage.propTypes = {
  tokenCount: PropTypes.number,
  tokenValidInDays: PropTypes.number,
  actualTokens: PropTypes.array,
  newTokens: PropTypes.array,

  // validation

  // actions
  onChangeTokenCount: PropTypes.func,
  onChangeTokenValidInDays: PropTypes.func,
  onGenerateTokens: PropTypes.func,
  onFetchActualTokens: PropTypes.func,
};


const mapStateToProps = createStructuredSelector({
  tokenCount: makeSelectTokenCount(),
  tokenValidInDays: makeSelectTokenValidInDays(),
  actualTokens: makeSelectActualTokens(),
  newTokens: makeSelectNewTokens(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeTokenCount: (evt) => dispatch(changeTokenCount(evt.target.value)),
    onChangeTokenValidInDays: (evt) => dispatch(changeTokenValidInDays(evt.target.value)),
    onGenerateTokens: () => dispatch(generateTokens()),
    onFetchActualTokens: () => dispatch(fetchActualTokens()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectIntl,
  memo
)(GenerateTokensPage);
