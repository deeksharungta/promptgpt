import {
  ChangeEvent,
  InputAction,
  InputState,
  useReducer,
} from "@/helpers/imports";

const initialInputState: InputState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (
  state: InputState,
  action: InputAction
): InputState => {
  switch (action.type) {
    case "INPUT":
      return { value: action.value || "", isTouched: state.isTouched };
    case "BLUR":
      return { isTouched: true, value: state.value };
    case "RESET":
      return { isTouched: false, value: "" };
    default:
      return state;
  }
};

const useInput = (
  validateValue: (value: string) => boolean,
  initialValue?: string
) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, {
    ...initialInputState,
    value: initialValue || "",
  });
  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const inputBlurHandler = () => {
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
