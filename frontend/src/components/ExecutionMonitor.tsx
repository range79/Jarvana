import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, RotateCcw, Terminal, Clock, Activity } from 'lucide-react';
import { ExecutionResponseDto } from '../types/api';
import { executionApi } from '../services/api';
import { Card, CardContent, CardHeader } from './ui/Card';
import Button from './ui/Button';
import Badge from './ui/Badge';

interface ExecutionMonitorProps {
  jarId?: number;
  onClose?: () => void;
}

const ExecutionMonitor: React.FC<ExecutionMonitorProps> = ({ jarId, onClose }) => {
  const [execution, setExecution] = useState<ExecutionResponseDto | null>(null);
  const [output, setOutput] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'PENDING':
        return <Badge variant="warning">Pending</Badge>;
      case 'RUNNING':
        return <Badge variant="info">Running</Badge>;
      case 'FAILED':
        return <Badge variant="danger">Failed</Badge>;
      case 'KILLED':
        return <Badge variant="danger">Killed</Badge>;
      default:
        return <Badge variant="default">Unknown</Badge>;
    }
  };

  const startExecution = async () => {
    if (!jarId) return;

    try {
      setLoading(true);
      setError(null);
      setOutput([]);
      
      console.log('Starting execution for JAR ID:', jarId);
      
      // Start execution using the real API
      const execution = await executionApi.startExecution(jarId);
      console.log('Execution response:', execution);
      
      setExecution(execution);
      
      // Try to start streaming with the execution ID
      if (execution.id) {
        try {
          startStreaming(execution.id);
        } catch (streamError) {
          console.log('Streaming not available, continuing without stream');
          // Continue without streaming if it's not available
        }
      }
      
    } catch (err) {
      console.error('Error starting execution:', err);
      setError('Failed to start execution');
    } finally {
      setLoading(false);
    }
  };

  const stopExecution = async () => {
    if (!execution?.id) return;

    try {
      // Stop execution using the API
      const stoppedExecution = await executionApi.stopExecution(execution.id);
      setExecution(stoppedExecution);
      stopStreaming();
    } catch (err) {
      console.error('Error stopping execution:', err);
      // If API call fails, just update the local state
      setExecution(prev => prev ? { ...prev, executionStatus: 'KILLED' } : null);
      stopStreaming();
    }
  };

  const startStreaming = (executionId: number) => {
    try {
      const eventSource = executionApi.streamExecution(executionId);
      eventSourceRef.current = eventSource;
      setIsStreaming(true);

      eventSource.onmessage = (event) => {
        setOutput(prev => [...prev, event.data]);
        // Auto-scroll to bottom
        if (outputRef.current) {
          outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
      };

      eventSource.onerror = (error) => {
        console.error('EventSource error:', error);
        stopStreaming();
      };

      eventSource.onopen = () => {
        console.log('EventSource connection opened');
      };
    } catch (err) {
      console.error('Error starting stream:', err);
      setError('Failed to start output streaming');
    }
  };

  const stopStreaming = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    setIsStreaming(false);
  };

  const clearOutput = () => {
    setOutput([]);
  };

  const formatDuration = (startTime: string, endTime?: string) => {
    const start = new Date(startTime);
    const end = endTime ? new Date(endTime) : new Date();
    const diff = end.getTime() - start.getTime();
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  };

  useEffect(() => {
    return () => {
      stopStreaming();
    };
  }, []);

  if (!jarId) {
    return (
      <Card>
        <CardContent>
          <div className="text-center py-8">
            <Terminal className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No JAR Selected
            </h3>
            <p className="text-gray-500">
              Select a JAR file to start execution monitoring
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Terminal className="h-6 w-6 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                Execution Monitor
              </h2>
            </div>
            {onClose && (
              <Button variant="secondary" size="sm" onClick={onClose}>
                Close
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {!execution ? (
            <div className="text-center py-8">
              <Play className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Ready to Execute
              </h3>
              <p className="text-gray-500 mb-4">
                Click the button below to start execution
              </p>
              <Button
                onClick={startExecution}
                loading={loading}
                disabled={loading}
              >
                <Play className="h-4 w-4 mr-2" />
                Start Execution
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Execution Status */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-primary-600" />
                    <span className="font-medium">Status:</span>
                    {getStatusBadge(execution.executionStatus)}
                  </div>
                  {execution.pid && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">PID:</span>
                      <span className="font-mono text-sm bg-gray-200 px-2 py-1 rounded">
                        {execution.pid}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {formatDuration(execution.startedAt, execution.endedAt)}
                  </span>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center space-x-2">
                {execution.executionStatus === 'RUNNING' && (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={stopExecution}
                  >
                    <Square className="h-4 w-4 mr-1" />
                    Stop
                  </Button>
                )}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={clearOutput}
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Clear Output
                </Button>
              </div>

              {/* Output Console */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">
                    Console Output
                  </h3>
                  {isStreaming && (
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-success-600">Live</span>
                    </div>
                  )}
                </div>
                <div
                  ref={outputRef}
                  className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm h-64 overflow-y-auto"
                >
                  {output.length === 0 ? (
                    <div className="text-gray-500">
                      Waiting for output...
                    </div>
                  ) : (
                    output.map((line, index) => (
                      <div key={index} className="whitespace-pre-wrap">
                        {line}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-danger-50 border border-danger-200 rounded-lg">
              <p className="text-danger-700">{error}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ExecutionMonitor;
