import  { Component, ErrorInfo, ReactNode } from "react";
import { Box, Text } from "ink";
import { colors } from "../constants";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      hasError: true,
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box flexDirection="column" padding={1} borderStyle="double" borderColor={colors.error}>
          <Box marginBottom={1}>
            <Text backgroundColor={colors.error} color="white" bold>
              {" "}
              FATAL ERROR{" "}
            </Text>
          </Box>
          <Box marginBottom={1}>
            <Text color={colors.error} bold>
              {this.state.error?.name}: {this.state.error?.message}
            </Text>
          </Box>
          {this.state.error?.stack && (
            <Box flexDirection="column">
              <Text color={colors.dim}>Stack trace:</Text>
              <Text color={colors.muted}>{this.state.error.stack}</Text>
            </Box>
          )}
          {this.state.errorInfo?.componentStack && (
            <Box flexDirection="column" marginTop={1}>
              <Text color={colors.dim}>Component stack:</Text>
              <Text color={colors.muted}>{this.state.errorInfo.componentStack}</Text>
            </Box>
          )}
          <Box marginTop={1}>
            <Text color={colors.dim}>Press q to quit</Text>
          </Box>
        </Box>
      );
    }

    return this.props.children;
  }
}
