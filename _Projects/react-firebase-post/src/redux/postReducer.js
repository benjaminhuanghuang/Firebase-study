import { GET_QUESTIONS, GET_USER_ANSWERS, } from './consts';

const initialState = {
  questions: [],
  quesitonsLoaded: false,
  userAnswers: [],
  userAnswersLoaded: false,
  currentQuestionId: ""
}

const postReducer = (state = initialState, action) => {
  switch(action.type) {
    
    default:
      return state;
  }
}

export default postReducer;