module.exports = {
  testEnvironment: "jsdom", // Simula un entorno de navegador para pruebas de React
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"], // Carga setupTests.js antes de las pruebas
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Maneja archivos CSS en Jest
  },
  transform: {
    "^.+\\.jsx?$": "babel-jest", // Transforma JSX con Babel
  },
};