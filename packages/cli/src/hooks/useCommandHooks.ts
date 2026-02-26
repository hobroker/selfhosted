import { useState } from "react";
import { CommandState } from "../constants";
import { Result } from "execa";

interface Props {
  onStart?: () => void;
  onSuccess?: (result: Result) => void;
  onError?: (error: Error) => void;
}

export const useCommandHooks = ({ onStart, onSuccess, onError }: Props = {}) => {
  const [commandState, setCommandState] = useState<CommandState>(CommandState.Idle);

  const _onStart = () => {
    setCommandState(CommandState.Loading);
    onStart?.();
  };

  const _onSuccess = (result: Result) => {
    setCommandState(CommandState.Success);
    onSuccess?.(result);
  };

  const _onError = (error: Error) => {
    setCommandState(CommandState.Error);
    onError?.(error);
  };

  return {
    onStart: _onStart,
    onSuccess: _onSuccess,
    onError: _onError,
    commandState,
  };
};
