
## 📦 Version 1.0.1 – DTOs & Loop Fix

### ✅ Added
- **`ExecutionResponseDto`**: Introduced a new data transfer object to safely expose execution information without causing serialization issues.

### 🛠️ Changed
- Updated `JarExecutionService.run()` and `stop()` to return `ExecutionResponseDto` instead of the full entity, improving API response clarity and structure.

### 🐞 Fixed
- **Infinite loop issue**: Fixed a circular reference problem between `Execution` and `JarFile` entities during serialization.
- **Frontend `run()` function**: Refactored with the help of ChatGPT — now correctly invokes execution from the web UI.


## 📦 Version 1.0.2 – Minor Fixes & Improvements

### ✅ Added
- `InvalidJarFileException` now properly handled and returned as an error response when a non-JAR file is uploaded or executed.

### 🛠 Improved
- Better error messages for invalid execution attempts.
- Minor internal cleanup in `JarExecutionServiceImpl`.

---
## 📦 Version 1.1.0

### ✅ New Features
- `deleteById(id)` method added to the service layer
- Unit tests implemented for `JarStorageService` using JUnit 5 and Mockito

### 🧪 Tests
- Added tests for `upload`, `download`, `delete`, and `deleteAll` operations
- Exception scenarios covered using `assertThrows`
- `ArgumentCaptor` used to verify saved entity data

### 🛠️ Improvements
- Minor code refactoring and cleanups
- Improved code readability and testability
## 📦 Version 1.2.0 – API Enhancement & Frontend Automation

### ✅ New Features
- **Pagination Support**: Implemented pagination and sorting for jar listing with configurable page size and direction
- **Swagger/OpenAPI Documentation**: Added comprehensive API documentation annotations for all endpoints
- **PID-based Execution Lookup**: Enhanced execution repository with PID-based search functionality

### 🛠️ Changed
- **Simplified API Responses**: Removed ResponseDto wrapper for cleaner, more direct API responses
- **Execution Stop Method**: Changed stop execution to return void for cleaner API design
- **Jar Metadata Service**: Updated to support pagination with size, page, direction, and properties parameters

### 🐞 Fixed
- **Exception Handling**: Improved error handling in execution service with better logging
- **API Consistency**: Standardized response formats across all endpoints

### 🚀 Developer Experience
- **Better Documentation**: All API endpoints now have proper OpenAPI documentation

---