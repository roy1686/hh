import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center bg-[#010804] text-white">
          <div className="p-4 bg-red-500/20 rounded-full mb-6">
            <AlertTriangle className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Dashboard Component Error</h2>
          <p className="text-gray-400 mb-8 max-w-lg">
            An unexpected error occurred while rendering this module. Our engineering team has been notified.
          </p>
          
          <div className="bg-surface/50 p-4 rounded-lg border border-red-500/20 text-left mb-8 max-w-2xl w-full overflow-auto custom-scrollbar">
            <p className="font-mono text-sm text-red-400 whitespace-pre-wrap">
              {this.state.error?.toString()}
            </p>
          </div>

          <button 
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            <RefreshCcw className="w-4 h-4" />
            Reload Application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
