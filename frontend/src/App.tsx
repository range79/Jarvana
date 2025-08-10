import React, { useState } from 'react';
import Layout from './components/Layout';
import FileUpload from './components/FileUpload';
import JarList from './components/JarList';
import ExecutionMonitor from './components/ExecutionMonitor';
import { Card, CardContent, CardHeader } from './components/ui/Card';
import { JarMetadataDto } from './types/api';
import { jarApi } from './services/api';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';

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
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Upload className="h-6 w-6 text-primary-600" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    Upload JAR File
                  </h2>
                </div>
              </CardHeader>
              <CardContent>
                {uploadStatus.success ? (
                  <div className="text-center py-8">
                    <CheckCircle className="mx-auto h-12 w-12 text-success-600 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Upload Successful!
                    </h3>
                    <p className="text-gray-500">
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
                      <div className="mt-4 p-4 bg-danger-50 border border-danger-200 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="h-5 w-5 text-danger-600" />
                          <p className="text-danger-700">{uploadStatus.error}</p>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
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
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">
                  Settings
                </h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      API Configuration
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          API Base URL
                        </label>
                        <input
                          type="text"
                          defaultValue="http://localhost:8080"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Application Info
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><strong>Version:</strong> 1.0.0</p>
                      <p><strong>Environment:</strong> Development</p>
                      <p><strong>Backend Status:</strong> Connected</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}

export default App;
