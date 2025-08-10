import axios from 'axios';
import { 
  JarMetadataDto, 
  PageJarMetadataDto, 
  ExecutionResponseDto,
  PaginationParams 
} from '../types/api';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// JAR Management APIs
export const jarApi = {
  // Upload JAR file
  upload: async (file: File): Promise<JarMetadataDto> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/jars/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Download JAR file
  download: async (id: number): Promise<Blob> => {
    const response = await api.get(`/jars/download/${id}`, {
      responseType: 'blob',
    });
    return response.data;
  },

  // Delete single JAR
  deleteSingle: async (id: number): Promise<void> => {
    await api.delete(`/jars/delete/${id}`);
  },

  // Delete all JARs
  deleteAll: async (): Promise<void> => {
    await api.delete('/jars/delete/all');
  },
};

// JAR Info APIs
export const jarInfoApi = {
  // Get JAR by ID
  getById: async (id: number): Promise<JarMetadataDto> => {
    const response = await api.get(`/info/${id}`);
    return response.data;
  },

  // Get all JARs with pagination
  getAll: async (params: PaginationParams = {}): Promise<PageJarMetadataDto> => {
    const response = await api.get('/info/all', { params });
    return response.data;
  },
};

// Execution APIs
export const executionApi = {
  // Start/Get execution status
  startExecution: async (jarId: number): Promise<ExecutionResponseDto> => {
    const response = await api.get(`/exec/${jarId}`);
    return response.data;
  },

  // Get execution status
  getExecution: async (id: number): Promise<ExecutionResponseDto> => {
    const response = await api.get(`/exec/${id}`);
    return response.data;
  },

  // Stream execution
  streamExecution: (id: number): EventSource => {
    return new EventSource(`${API_BASE_URL}/exec/stream/${id}`);
  },

  // Stop execution
  stopExecution: async (id: number): Promise<ExecutionResponseDto> => {
    const response = await api.delete(`/exec/stop/${id}`);
    return response.data;
  },
};

export default api;
