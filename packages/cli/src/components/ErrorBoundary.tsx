import React, { Component, ErrorInfo, ReactNode } from "react";
import { Box, Text } from "ink";

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
        <Box flexDirection="column" padding={1} borderStyle="double" borderColor="red">
          <Box marginBottom={1}>
            <Text backgroundColor="red" color="white" bold>
              {" "}
              FATAL ERROR{" "}
            </Text>
          </Box>
          <Box marginBottom={1}>
            <Text color="red" bold>
              {this.state.error?.name}: {this.state.error?.message}
            </Text>
          </Box>
          {this.state.error?.stack && (
            <Box flexDirection="column">
              <Text dimColor>Stack trace:</Text>
              <Text color="gray">{this.state.error.stack}</Text>
            </Box>
          )}
          {this.state.errorInfo?.componentStack && (
            <Box flexDirection="column" marginTop={1}>
              <Text dimColor>Component stack:</Text>
              <Text color="gray">{this.state.errorInfo.componentStack}</Text>
            </Box>
          )}
          <Box marginTop={1}>
            <Text dimColor>Press q to quit</Text>
          </Box>
        </Box>
      );
    }

    return this.props.children;
  }
}
