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
