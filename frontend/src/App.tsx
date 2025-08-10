import React, { useState } from 'react';
import Layout from './components/Layout';
import FileUpload from './components/FileUpload';
import JarList from './components/JarList';
import ExecutionMonitor from './components/ExecutionMonitor';
import ConnectionNotification from './components/ConnectionNotification';
import { MaterialCard, MaterialCardContent, MaterialCardHeader } from './components/ui/MaterialCard';

import { JarMetadataDto } from './types/api';
import { jarApi } from './services/api';
import { Upload, CheckCircle, AlertCircle, Sparkles, Settings } from 'lucide-react';
import { ThemeProvider } from './contexts/ThemeContext';
import { ConnectionProvider } from './contexts/ConnectionContext';

function App() {
  const [activeTab, setActiveTab] = useState('upload');
  const [selectedJar, setSelectedJar] = useState<JarMetadataDto | null>(null);
  const [uploadStatus, setUploadStatus] = useState<{
    loading: boolean;
    success: boolean;
    error: string | null;
  }>({
    loading: false,
    success: false,
    error: null,
  });
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleFileUpload = async (file: File) => {
    setUploadStatus({
      loading: true,
      success: false,
      error: null,
    });

    try {
      await jarApi.upload(file);
      setUploadStatus({
        loading: false,
        success: true,
        error: null,
      });
      // Refresh the JAR list
      setRefreshTrigger(prev => prev + 1);
      // Switch to files tab after successful upload
      setTimeout(() => {
        setActiveTab('files');
        setUploadStatus({
          loading: false,
          success: false,
          error: null,
        });
      }, 2000);
    } catch (error) {
      setUploadStatus({
        loading: false,
        success: false,
        error: 'Failed to upload file. Please try again.',
      });
    }
  };

  const handleJarSelect = (jar: JarMetadataDto) => {
    setSelectedJar(jar);
    setActiveTab('monitor');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'upload':
        return (
          <div className="max-w-2xl mx-auto animate-slide-in-right">
            <MaterialCard elevation={3} hoverable animated>
              <MaterialCardHeader>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Upload className="h-6 w-6 text-primary-600 animate-wave" />
                    <Sparkles className="h-3 w-3 text-secondary-500 absolute -top-1 -right-1 animate-pulse" />
                  </div>
                  <h2 className="text-xl font-semibold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    Upload JAR File
                  </h2>
                </div>
              </MaterialCardHeader>
              <MaterialCardContent>
                {uploadStatus.success ? (
                  <div className="text-center py-8 animate-material-bounce">
                    <CheckCircle className="mx-auto h-12 w-12 text-success-600 mb-4 animate-scale-in" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Upload Successful!
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Your JAR file has been uploaded successfully.
                    </p>
                  </div>
                ) : (
                  <>
                    <FileUpload
                      onUpload={handleFileUpload}
                      loading={uploadStatus.loading}
                    />
                    {uploadStatus.error && (
                      <div className="mt-4 p-4 bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 rounded-lg animate-slide-in-left">
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="h-5 w-5 text-danger-600 animate-pulse" />
                          <p className="text-danger-700 dark:text-danger-300">{uploadStatus.error}</p>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </MaterialCardContent>
            </MaterialCard>
          </div>
        );

      case 'files':
        return (
          <JarList
            onJarSelect={handleJarSelect}
            refreshTrigger={refreshTrigger}
          />
        );

      case 'monitor':
        return (
          <ExecutionMonitor
            jarId={selectedJar?.id}
            onClose={() => setActiveTab('files')}
          />
        );

      case 'settings':
        return (
          <div className="max-w-2xl mx-auto animate-slide-in-left">
            <MaterialCard elevation={3} hoverable animated>
              <MaterialCardHeader>
                <div className="flex items-center space-x-3">
                  <Settings className="h-6 w-6 text-primary-600 animate-rotate-in" />
                  <h2 className="text-xl font-semibold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    Settings
                  </h2>
                </div>
              </MaterialCardHeader>
              <MaterialCardContent>
                <div className="space-y-6">
                  <div className="animate-slide-in-right">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      API Configuration
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          API Base URL
                        </label>
                        <input
                          type="text"
                          defaultValue="http://localhost:8080"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-white transition-colors"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Application Info
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <p><strong>Version:</strong> 1.0.0</p>
                      <p><strong>Environment:</strong> Development</p>
                      <p><strong>Backend Status:</strong> Connected</p>
                    </div>
                  </div>
                </div>
              </MaterialCardContent>
            </MaterialCard>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <ThemeProvider>
      <ConnectionProvider>
        <ConnectionNotification />
        <Layout activeTab={activeTab} onTabChange={setActiveTab}>
          {renderContent()}
        </Layout>
      </ConnectionProvider>
    </ThemeProvider>
  );
}

export default App;
