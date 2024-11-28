# Project Setup Guide  

This guide provides step-by-step instructions to set up and run the backend and frontend of the project.

---

## Prerequisites  
Ensure you have the following installed on your system:  
- Node.js (v16 or higher)  
- npm (v8 or higher)  
- Windows Subsystem for Linux (WSL) with Ubuntu 20.04 LTS  

---

## Backend Setup  

The backend should be run inside the **`intern`** folder. Follow these steps:  

### 1. Set Up WSL  
Follow the steps in this article: [How to Install WSL 2 Ubuntu 20.04 LTS on Windows](https://medium.com/@sjmwatsefu/how-to-install-wsl-2-ubuntu-20-04-lts-on-windows-and-open-visual-studio-code-from-the-terminal-e580761e84f8)  

**Important:**  
- Skip the "Update the Windows Subsystem for Linux (WSL) to WSL 2" section.  
- Continue directly to "Configuring Git and GitHub on WSL2".  

### 2. Install Dependencies  
1. Open the Linux terminal.  
2. Navigate to the `intern` folder:  
   ```bash
   cd path/to/intern

 npm install <br/>
 npm run dev <br/>
on linux terminal you should see "backend is running on host"<br/>
Frontend can be run on powershell/cmd prompt<br/>
Run <br/>
 npm install<br/>
 npm start <br/>
it will directly opens the website<br/>
