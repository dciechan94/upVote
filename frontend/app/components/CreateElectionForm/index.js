import React from 'react';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';

import { Tile, TextInput, Button, TextArea, DatePickerInput, TimePicker } from 'carbon-components-react';


const TagListWrapper = styled.div`
  padding-bottom: 1rem;
`;

class CreateElectionForm extends React.Component {

  render() {

    const {formatMessage} = this.props.intl;

    return (
      <Tile>
        <TagListWrapper>
          <TextInput
            id="test2"
            labelText={formatMessage({id:"upvote.components.ElectionCreateForm.name"})}
            required
            hideLabel={false}
            light={false}

            value={this.props.name}
            onChange={this.props.onChangeName}
          />
        </TagListWrapper>

        <TagListWrapper>
          <TextArea
            id="test22"
            labelText={formatMessage({id:"upvote.components.ElectionCreateForm.longDescription"})}
            hideLabel={false}
            light={false}
            
            value={this.props.longDescription}
            onChange={this.props.onChangeLongDescription}
          />
        </TagListWrapper>

        <TagListWrapper>
          <DatePickerInput
            id="date-picker-input-id"
            labelText={formatMessage({id:"upvote.components.ElectionCreateForm.publishDate"})}

            value={this.props.publishDate}
            onChange={this.props.onChangePublishDate}
          />
        </TagListWrapper>

        <TagListWrapper>
          <DatePickerInput
            id="date-picker-input-id"
            labelText={formatMessage({id:"upvote.components.ElectionCreateForm.startVotingDate"})}

            placeholder="dd/mm/yyyy"

            value={this.props.startVotingDate}
            onChange={this.props.onChangeStartVotingDate}
          />
        </TagListWrapper>

        <TagListWrapper>
          <TimePicker
            id="time-picker"
            hideLabel={false}
            labelText="Godzina rozpoczęcia"
            invalidText="A valid value is required"
            onClick={()=>{}}
            onChange={()=>{}}
            onBlur={()=>{}}
          />
</TagListWrapper>

        <TagListWrapper>
          <DatePickerInput
            id="date-picker-input-id"
            labelText={formatMessage({id:"upvote.components.ElectionCreateForm.finishVotingDate"})}

            placeholder="dd/mm/yyyy"

            value={this.props.finishVotingDate}
            onChange={this.props.onChangeFinishVotingDate}
          />
        </TagListWrapper>

<TagListWrapper>
<TimePicker
  id="time-picker"
  hideLabel={false}
  labelText="Godzina zakończenia"
  invalidText="A valid value is required"
  onClick={()=>{}}
  onChange={()=>{}}
  onBlur={()=>{}}
/>
</TagListWrapper>


        <TagListWrapper>
          <DatePickerInput
            id="date-picker-input-id"
            labelText={formatMessage({id:"upvote.components.ElectionCreateForm.resultsPublishDate"})}

            placeholder="dd/mm/yyyy"

            value={this.props.resultsPublishDate}
            onChange={this.props.onChangeResultsPublishDate}
          />
        </TagListWrapper>


<TagListWrapper>
<Button  onClick={()=>{}} onFocus={()=>{}}>
{formatMessage({id:"upvote.components.ElectionCreateForm.createButtonText"})}

</Button>
</TagListWrapper>
</Tile>
    );
  }

}

export default injectIntl(CreateElectionForm);
