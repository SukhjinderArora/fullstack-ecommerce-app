import { useEffect, useReducer } from 'react';

import { setAllObjectProperties, checkIfEmpty } from '../utils';
import * as logger from '../utils/logger';

const actionTypes = {
  TOUCHED: 'touched',
  CHANGE: 'change',
  RESET: 'reset',
  ERROR: 'error',
  TOUCHALL: 'touchall',
  FOCUSED: 'focused',
};

const formReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.TOUCHED:
      return {
        ...state,
        touched: { ...state.touched, [action.input.name]: true },
      };
    case actionTypes.FOCUSED:
      return {
        ...state,
        focused: { ...state.focused, [action.input.name]: action.input.value },
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

const defaultValidationFunction = () => ({});

const defaultSubmitFunction = () => {
  logger.warn('Please pass the onSubmit function as the function argument');
};

const useForm = ({
  initialValues = {},
  validate = defaultValidationFunction,
  onSubmit = defaultSubmitFunction,
} = {}) => {
  const initialFormState = {
    values: initialValues || {},
    errors: {},
    touched: setAllObjectProperties(initialValues, false),
    focused: setAllObjectProperties(initialValues, false),
  };

  const [{ values, errors, touched, focused }, dispatch] = useReducer(
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

  const handleFocus = (evt) => {
    dispatch({
      type: actionTypes.FOCUSED,
      input: {
        name: evt.target.name,
        value: true,
      },
    });
  };

  const handleBlur = (evt) => {
    dispatch({
      type: actionTypes.TOUCHED,
      input: {
        name: evt.target.name,
      },
    });
    dispatch({
      type: actionTypes.FOCUSED,
      input: {
        name: evt.target.name,
        value: false,
      },
    });
  };

  const handleChange = (evt) => {
    dispatch({
      type: actionTypes.CHANGE,
      input: {
        name: evt.target.name,
        value:
          evt.target.type === 'checkbox'
            ? evt.target.checked
            : evt.target.value,
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
    if (checkIfEmpty(errors)) {
      onSubmit(values, { resetForm });
    }
  };

  return {
    values,
    errors,
    touched,
    focused,
    handleFocus,
    handleBlur,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
