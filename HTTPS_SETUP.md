# HTTPS Setup for Local Development

## Overview

This project is configured to run with HTTPS for local development using self-signed certificates.

## What Was Configured

### 1. SSL Certificates

- Located in `.ssl/` directory (gitignored)
- Generated using [mkcert](https://github.com/FiloSottile/mkcert)
- Valid for: `localhost`, `127.0.0.1`, `::1`
- Expires: April 23, 2028

### 2. Configuration Files Updated

**angular.json**

```json
"serve": {
  "options": {
    "ssl": true,
    "sslCert": ".ssl/localhost.pem",
    "sslKey": ".ssl/localhost-key.pem"
  }
}
```

**package.json**

```json
"scripts": {
  "start": "ng serve --ssl",
  "start:http": "ng serve"
}
```

**.vscode/launch.json**

```json
"url": "https://localhost:4200/"
```

## Running the Application

### HTTPS (Default)

```bash
npm start
```

Access at: **https://localhost:4200/**

### HTTP (Fallback)

```bash
npm run start:http
```

Access at: **http://localhost:4200/**

## Certificate Installation

The certificates are automatically trusted on your system thanks to mkcert.

### Regenerate Certificates (if needed)

```bash
cd .ssl
mkcert localhost 127.0.0.1 ::1
mv localhost+2.pem localhost.pem
mv localhost+2-key.pem localhost-key.pem
```

## Browser Security Notes

- ✅ Chrome/Edge: Will accept the certificate without warnings
- ✅ Safari: Will accept the certificate without warnings
- ⚠️ Firefox: May require manual certificate trust (not automatically handled by mkcert on Windows)

## Team Setup

When other developers clone this repository, they need to:

1. **Install mkcert** (if not already installed):

   ```bash
   winget install -e --id FiloSottile.mkcert
   ```

2. **Generate their own certificates**:

   ```bash
   mkcert -install
   mkdir .ssl
   cd .ssl
   mkcert localhost 127.0.0.1 ::1
   mv localhost+2.pem localhost.pem
   mv localhost+2-key.pem localhost-key.pem
   ```

3. **Start the app**:
   ```bash
   npm start
   ```

## Why HTTPS?

- Required for testing PWA features
- Required for Service Workers
- Required for modern Web APIs (WebRTC, Geolocation, etc.)
- Matches production environment
- Better security testing

## Troubleshooting

### Port 4200 already in use

```bash
# Find and kill the process
Get-NetTCPConnection -LocalPort 4200 | Select-Object OwningProcess
Stop-Process -Id <ProcessId> -Force
```

### Certificate not trusted

```bash
# Reinstall mkcert root CA
mkcert -install
```

### Want to use different port

```bash
ng serve --ssl --port 4300
```
