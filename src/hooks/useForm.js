import { useEffect, useReducer } from 'react';

import { setAllObjectProperties } from '../utils';

const actionTypes = {
  TOUCHED: 'touched',
  CHANGE: 'change',
  RESET: 'reset',
  ERROR: 'error',
  TOUCHALL: 'touchall',
};

const formReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.TOUCHED:
      return {
        ...state,
        touched: { ...state.touched, [action.input.name]: true },
      };
    case actionTypes.CHANGE:
      return {
        ...state,
        values: { ...state.values, [action.input.name]: action.input.value },
      };
    case actionTypes.RESET:
      return action.initialState;
    case actionTypes.ERROR:
      return { ...state, errors: action.errors };
    case actionTypes.TOUCHALL: {
      const touched = setAllObjectProperties(state.touched, true);
      return { ...state, touched };
    }
    default:
      return state;
  }
};

const useForm = ({
  initialValues = {},
  validate = () => {},
  onSubmit = () => {},
} = {}) => {
  const initialFormState = {
    values: initialValues || {},
    errors: {},
    touched: setAllObjectProperties(initialValues, false),
  };

  const [{ values, errors, touched }, dispatch] = useReducer(
    formReducer,
    initialFormState
  );

  useEffect(() => {
    const formErrors = validate(values);
    dispatch({
      type: actionTypes.ERROR,
      errors: { ...formErrors },
    });
  }, [values, touched, validate]);

  const handleFocus = () => {};

  const handleBlur = (evt) => {
    dispatch({
      type: actionTypes.TOUCHED,
      input: {
        name: evt.target.name,
      },
    });
  };

  const handleChange = (evt) => {
    dispatch({
      type: actionTypes.CHANGE,
      input: {
        name: evt.target.name,
        value: evt.target.value,
      },
    });
  };

  const resetForm = () => {
    dispatch({
      type: actionTypes.RESET,
      initialState: initialFormState,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch({
      type: actionTypes.TOUCHALL,
    });
    if (!errors) {
      onSubmit(values, { resetForm });
    }
  };

  return {
    values,
    errors,
    touched,
    handleFocus,
    handleBlur,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
