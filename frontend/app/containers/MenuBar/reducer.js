import produce from 'immer';

export const initialState = {
};

const menuBarReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {

    }
  });

export default menuBarReducer;
