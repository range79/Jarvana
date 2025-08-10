# Jarvana - JAR File Management System

A modern, beautiful frontend application for managing JAR files with upload, download, execution, and monitoring capabilities.

## Features

- 🚀 **Modern UI/UX**: Clean, responsive design with Tailwind CSS
- 📁 **File Management**: Upload, download, and delete JAR files
- 🎯 **Execution Monitoring**: Real-time execution status and output streaming
- 📊 **File Listing**: Paginated list with search and sorting
- 🔄 **Real-time Updates**: Live status updates and console output
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Axios** for API communication
- **Lucide React** for icons
- **React Router** for navigation

## Prerequisites

- Node.js 16+ 
- npm or yarn
- Backend API running on `http://localhost:8080`

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## API Endpoints

The frontend communicates with the following backend endpoints:

### JAR Management
- `POST /jars/upload` - Upload JAR file
- `GET /jars/download/{id}` - Download JAR file
- `DELETE /jars/delete/{id}` - Delete single JAR
- `DELETE /jars/delete/all` - Delete all JARs

### JAR Information
- `GET /info/{id}` - Get JAR by ID
- `GET /info/all` - Get all JARs with pagination

### Execution
- `GET /exec/{id}` - Get execution status
- `GET /exec/stream/{id}` - Stream execution output
- `DELETE /exec/stop/{id}` - Stop execution

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── FileUpload.tsx  # File upload component
│   ├── JarList.tsx     # JAR file listing
│   ├── ExecutionMonitor.tsx # Execution monitoring
│   └── Layout.tsx      # Application layout
├── services/           # API services
│   └── api.ts         # API client functions
├── types/             # TypeScript type definitions
│   └── api.ts         # API response types
├── utils/             # Utility functions
│   └── cn.ts          # Class name utility
├── App.tsx            # Main application component
├── index.tsx          # Application entry point
└── index.css          # Global styles
```

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Configuration

The application is configured to connect to the backend API at `http://localhost:8080`. You can modify this in `src/services/api.ts`:

```typescript
const API_BASE_URL = 'http://localhost:8080';
```

## Features in Detail

### File Upload
- Drag and drop support
- File type validation (.jar files)
- Progress indication
- Error handlingf

### JAR Management
- List all uploaded JAR files
- Download files
- Delete individual or all files
- File metadata display (size, creation date)

### Execution Monitoring
- Start JAR execution
- Real-time status updates
- Live console output streaming
- Stop execution
- Execution history

### User Interface
- Tab-based navigation
- Responsive design
- Loading states
- Error handling
- Success notifications

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.
