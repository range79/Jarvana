## 📦 Version 1.0.1 – DTOs & Loop Fix

### ✅ Added
- **`ExecutionResponseDto`**: Introduced a new data transfer object to safely expose execution information without causing serialization issues.

### 🛠️ Changed
- Updated `JarExecutionService.run()` and `stop()` to return `ExecutionResponseDto` instead of the full entity, improving API response clarity and structure.

### 🐞 Fixed
- **Infinite loop issue**: Fixed a circular reference problem between `Execution` and `JarFile` entities during serialization.
- **Frontend `run()` function**: Refactored with the help of ChatGPT — now correctly invokes execution from the web UI.
