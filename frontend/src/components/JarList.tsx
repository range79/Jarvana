import React, { useState, useEffect, useCallback } from 'react';
import { Download, Trash2, Play, Clock, FileText, WifiOff } from 'lucide-react';
import { JarMetadataDto } from '../types/api';
import { jarApi, jarInfoApi } from '../services/api';
import { Card, CardContent } from './ui/Card';
import Button from './ui/Button';
import { useConnection } from '../contexts/ConnectionContext';

interface JarListProps {
  onJarSelect?: (jar: JarMetadataDto) => void;
  refreshTrigger?: number;
}

const JarList: React.FC<JarListProps> = ({ onJarSelect, refreshTrigger }) => {
  const { isConnected } = useConnection();
  const [jars, setJars] = useState<JarMetadataDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0,
  });

  const fetchJars = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await jarInfoApi.getAll({
        page: pagination.page,
        size: pagination.size,
        direction: 'DESC',
        properties: 'createdAt',
      });
      
      setJars(response.content || []);
      setPagination(prev => ({
        ...prev,
        totalElements: response.totalElements || 0,
        totalPages: response.totalPages || 0,
      }));
      setError(null); // Ensure error is cleared on success
    } catch (err) {
      console.error('Error fetching JARs:', err);
      setError('Failed to fetch JAR files');
    } finally {
      setLoading(false);
    }
  }, []); // Remove dependencies to prevent infinite loops

  useEffect(() => {
    fetchJars();
  }, [refreshTrigger]); // Remove fetchJars dependency

  const handleDownload = async (jar: JarMetadataDto) => {
    try {
      if (!jar.id) return;
      
      const blob = await jarApi.download(jar.id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = jar.name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Error downloading JAR:', err);
      alert('Failed to download JAR file');
    }
  };

  const handleDelete = async (jar: JarMetadataDto) => {
    if (!jar.id) return;
    
    if (window.confirm(`Are you sure you want to delete "${jar.name}"?`)) {
      try {
        await jarApi.deleteSingle(jar.id);
        fetchJars(); // Refresh the list
      } catch (err) {
        console.error('Error deleting JAR:', err);
        alert('Failed to delete JAR file');
      }
    }
  };

  const handleExecute = (jar: JarMetadataDto) => {
    if (onJarSelect) {
      onJarSelect(jar);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatFileSize = (sizeInKb: number) => {
    if (sizeInKb < 1024) {
      return `${sizeInKb} KB`;
    }
    return `${(sizeInKb / 1024).toFixed(2)} MB`;
  };

  if (loading && jars.length === 0) {
    return (
      <Card>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <span className="ml-2 text-gray-600">Loading JAR files...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!isConnected) {
    return (
      <Card>
        <CardContent>
          <div className="text-center py-8">
            <WifiOff className="mx-auto h-12 w-12 text-danger-500 mb-4 animate-pulse" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Backend Disconnected
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Unable to fetch JAR files. Please check your backend connection.
            </p>
            <Button onClick={fetchJars} variant="primary">
              Retry Connection
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-danger-600 mb-4">{error}</p>
            <Button onClick={fetchJars} variant="primary">
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (jars.length === 0) {
    return (
      <Card>
        <CardContent>
          <div className="text-center py-8">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No JAR files found
            </h3>
            <p className="text-gray-500">
              Upload your first JAR file to get started
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">

      
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">
          JAR Files ({pagination.totalElements})
        </h2>
        <div className="flex space-x-2">
          <Button
            variant="danger"
            size="sm"
            onClick={async () => {
              if (window.confirm('Are you sure you want to delete all JAR files?')) {
                try {
                  await jarApi.deleteAll();
                  fetchJars();
                } catch (err) {
                  console.error('Error deleting all JARs:', err);
                  alert('Failed to delete all JAR files');
                }
              }
            }}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete All
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {jars.map((jar) => (
          <Card key={jar.id} className="hover:shadow-md transition-shadow">
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <FileText className="h-8 w-8 text-primary-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900 truncate">
                      {jar.name}
                    </h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-500">
                        {formatFileSize(jar.sizeInKb)}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {formatDate(jar.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleExecute(jar)}
                  >
                    <Play className="h-4 w-4 mr-1" />
                    Execute
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleDownload(jar)}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(jar)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-6">
          <Button
            variant="secondary"
            size="sm"
            disabled={pagination.page === 0}
            onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
          >
            Previous
          </Button>
          <span className="flex items-center px-3 py-2 text-sm text-gray-700">
            Page {pagination.page + 1} of {pagination.totalPages}
          </span>
          <Button
            variant="secondary"
            size="sm"
            disabled={pagination.page >= pagination.totalPages - 1}
            onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default JarList;
