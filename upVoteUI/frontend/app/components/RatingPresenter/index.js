import React from 'react';
import Rating from 'react-rating';


function RatingPresenter(props) {
  return (
    <Rating
				  emptySymbol="fa fa-star-o fa-1g"
				  fullSymbol="fa fa-star fa-1g"
          fractions={3}
          readonly
          initialRating={props.rating}
				/>
  );
}

export default RatingPresenter;
