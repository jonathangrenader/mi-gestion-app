<<<<<<< HEAD
# Gestión Empresarial Multiempresa

Aplicación web para la gestión de empresas en Argentina, con soporte multiempresa, integración con AFIP, y versiones Gratuita, Lite y Premium. Desarrollada con React, Firebase, y Vite.

## Características
- **Multiempresa**: Gestiona múltiples empresas con aislamiento de datos.
- **Módulos**: Ventas, Compras, Inventario, Contabilidad (Lite/Premium).
- **Integración AFIP**: Facturación electrónica con @afipsdk/afip.js (Lite/Premium).
- **Suscripciones**: Gratuita (1 empresa, 50 facturas), Lite (3 empresas, 500 facturas), Premium (ilimitado).
- **Reportes**: PDF y Excel con jsPDF y ExcelJS.
- **UI**: Responsive con Material-UI.

## Requisitos
- **Node.js**: v20.19.3
- **npm**: v10.8.2
- Firebase CLI
- Cuenta de Firebase
- Certificados AFIP para facturación electrónica

## Dependencias
- **Frontend**:
  - react: ^18.3.1
  - react-dom: ^18.3.1
  - react-router-dom: ^6.3.0
  - @mui/material: ^5.15.0
  - @emotion/react: ^11.11.4
  - @emotion/styled: ^11.11.5
  - @tanstack/react-query: ^4.36.1
  - recharts: ^2.15.4
  - jspdf: ^2.5.1
  - exceljs: ^4.4.0
  - stripe: ^14.0.0
  - @afipsdk/afip.js: ^1.1.3
- **Backend**:
  - firebase: ^9.23.0
  - firebase-admin: ^11.11.0
  - firebase-functions: ^4.4.1
  - @afipsdk/afip.js: ^1.1.3
- **Desarrollo**:
  - vite: ^4.5.3
  - @vitejs/plugin-react: ^4.3.1
  - jest: ^29.7.0
  - @testing-library/react: ^14.0.0
  - @testing-library/jest-dom: ^6.4.6

## Instalación
1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd mi-gestion-app
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura Firebase:
   - Crea un proyecto en [Firebase Console](https://console.firebase.google.com/).
   - Habilita Authentication, Firestore, Storage, Functions, y Hosting.
   - Copia las credenciales en `src/firebase.js`.
4. Configura AFIP:
   - Obtén certificados y claves privadas desde el portal de AFIP (https://www.afip.gob.ar).
   - Para pruebas, usa el entorno de homologación (https://servicios1.afip.gov.ar/wscdc/homologacion/).
   - Sube certificados (`cert.pem`) y claves privadas (`key.pem`) a Firebase Storage (`empresas/{empresaId}/certificados/`):
     ```bash
     firebase storage:upload cert.pem empresas/demo/certificados/cert.pem
     firebase storage:upload key.pem empresas/demo/certificados/key.pem
     ```
5. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## Configuración de Empresa DEMO
1. Crea datos ficticios en Firestore:
   - Ejecuta el script `functions/seedDemoData.js`:
     ```bash
     cd functions
     node seedDemoData.js
     ```
   - Esto crea una empresa DEMO (`empresas/demo`) con usuarios, ventas, e inventario.
2. Crea un usuario de prueba en Firebase Authentication:
   - Email: `demo@empresa.com`
   - Contraseña: `Demo1234`
3. Configura reglas de seguridad en `firestore.rules` para permitir acceso a la empresa DEMO.

## Despliegue
1. Compila la aplicación:
   ```bash
   npm run build
   ```
2. Despliega en Firebase:
   ```bash
   firebase deploy
   ```

## Configuración de AFIP
- Usa `@afipsdk/afip.js@1.1.3` para facturación electrónica.
- Configura el CUIT en `functions/afip.js` (p.ej., `20111111112` para homologación).
- Asegúrate de que `production: false` en `functions/afip.js` para pruebas.

## Estructura del Proyecto
- `src/`: Código fuente de la app React.
  - `components/`: Componentes reutilizables (Navbar, Sidebar, DataTable).
  - `context/`: Contextos para autenticación y gestión de empresas.
  - `pages/`: Páginas de los módulos (Ventas, Compras, etc.).
  - `services/`: Funciones para interactuar con Firebase y AFIP.
  - `styles/`: Estilos globales y tema de Material-UI.
- `functions/`: Firebase Functions para AFIP y suscripciones.
- `public/`: Archivos estáticos (favicon, index.html).

## Reglas de Seguridad
- **Firestore**: Asegura aislamiento de datos por empresa (`firestore.rules`).
- **Storage**: Restringe acceso a certificados AFIP (`storage.rules`).

## Contribuciones
1. Crea un fork del repositorio.
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza cambios y haz commit (`git commit -m "Añade nueva funcionalidad"`).
4. Sube los cambios (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia
MIT
=======
# mi-gestion-app
Aplicación web para gestión empresarial multiempresa con integración AFIP
>>>>>>> f55a7d83ec99d0f6b1c064ea4c87565b918afef7
