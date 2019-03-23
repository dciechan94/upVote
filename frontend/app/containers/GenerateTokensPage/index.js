/**
 *
 * GenerateTokensPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { 
  Button,
  Card,
  Checkbox,
  FormGroup,
  HTMLTable,
  NumericInput,
 } from "@blueprintjs/core";

import { 
  makeSelectTokensCount, 
  makeSelectTokensTimeout, 
  makeSelectTokenIds,
  makeSelectCodesSelection
} from './selectors'

import { 
  changeTokensCount, 
  changeTokensValidTimeout,
  changeCodesSelection,
  generateTokens,
  getActiveTokens,
  deleteTokens,
} from './actions';

import makeSelectGenerateTokensPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';


export class GenerateTokensPage extends React.PureComponent {
  
  render() {

    var longToDate = function(millisec) {
      const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      }

      var d = new Date(millisec);
      return new Intl.DateTimeFormat("pl-PL", options).format(d);
  }

    console.log(this.props.codes)
    var codesTableHeaders = [ "Code", "Valid until" ]
    var codes = this.props.codes;
    var codesSelection = this.props.codesSelection;

    return (
      <Card>
        <FormGroup
          label="Number of codes"
          labelFor="text-input"
        >        
          <NumericInput id="text-input" onValueChange={this.props.onCountChange} value={this.props.count}/>
        </FormGroup>
        
        <FormGroup
          helperText="[in days]"
          label="Validity time"
          labelFor="text-input"
        >    
          <NumericInput id="text-input" onValueChange={this.props.onTimeoutChange} value={this.props.timeout}/>
        </FormGroup>
        <Button icon="add" text="Generate tokens" onClick={this.props.onClickGenerateCodes}/>
        
        <HTMLTable condensed interactive bordered striped>
          <thead>
            <tr>
              {codesTableHeaders.map(header => (
                <th key={header}> {header} </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {codes.map(code => (
              <tr key={code.get("id")}>
                <td key={code.get("id")+"-code"}> <Checkbox key={code.get("id")+"-chb"} label={code.get("code")} onClick={() => this.props.onCheckboxSelect(code.get("id"))} checked={codesSelection.contains(code.get("id"))}/> </td>
                <td key={code.get("id")+"-validUntil"}> { longToDate(code.get("validUntil"))} </td>
              </tr>
            ))}
          </tbody>
        </HTMLTable>
        
        <Button icon="refresh" text="Refresh" onClick={this.props.onClickRefreshCodes} />
        
        <Button icon="delete" text="Delete selected" onClick={this.props.onClickDeleteSelectedCodes}/>
        <Button icon="delete" text="Delete all" onClick={this.props.onClickDeleteAllCodes}/>
        
      </Card>
    );
  }
}

GenerateTokensPage.propTypes = {
  count: PropTypes.number,
  timeout: PropTypes.number,

  isCountValid: PropTypes.bool,
  isTimeoutValid: PropTypes.bool,

  codes: PropTypes.object,
  codesSelection: PropTypes.object,

  dispatch: PropTypes.func.isRequired,
  onClickRefreshCodes: PropTypes.func.isRequired,
  onClickGenerateCodes: PropTypes.func.isRequired,
  onClickDeleteSelectedCodes: PropTypes.func.isRequired,
  onClickDeleteAllCodes: PropTypes.func.isRequired,
  onCheckboxSelect: PropTypes.func.isRequired,

  onCountChange: PropTypes.func.isRequired,
  onTimeoutChange: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  generateTokensPage: makeSelectGenerateTokensPage(),
  count: makeSelectTokensCount(),
  timeout: makeSelectTokensTimeout(),
  codes: makeSelectTokenIds(),
  codesSelection: makeSelectCodesSelection(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onClickRefreshCodes: () => dispatch(getActiveTokens()),
    onClickGenerateCodes: () => dispatch(generateTokens()),
    onClickDeleteSelectedCodes:() => dispatch(deleteTokens()),
    onClickDeleteAllCodes: () => dispatch(deleteTokens()),
    onCountChange: () => dispatch(changeTokensCount()),
    onTimeoutChange: () => dispatch(changeTokensValidTimeout()),
    onCheckboxSelect: (codeId) => dispatch(changeCodesSelection(codeId))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'generateTokensPage', reducer });
const withSaga = injectSaga({ key: 'generateTokensPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(GenerateTokensPage);
