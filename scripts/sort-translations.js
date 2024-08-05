const fs = require('fs');
const path = require('path');

// Función para ordenar objetos recursivamente
function sortObject(obj) {
  const sortedObj = {};
  Object.keys(obj)
    .sort()
    .forEach((key) => {
      if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        sortedObj[key] = sortObject(obj[key]);
      } else {
        sortedObj[key] = obj[key];
      }
    });
  return sortedObj;
}

// Función para ordenar el contenido del archivo de traducciones
function sortTranslations(filePath) {
  const translationsContent = fs.readFileSync(filePath, 'utf-8');

  // Extraer el objeto de traducciones
  const translationsMatch = translationsContent.match(
    /const \w+ = ({[\s\S]*?});/,
  );
  if (!translationsMatch) {
    throw new Error(
      `No se pudo encontrar el objeto de traducciones en ${filePath}`,
    );
  }

  const translationsObjectString = translationsMatch[1];
  const translationsObject = eval(`(${translationsObjectString})`);

  // Ordenar las claves del objeto de traducciones
  const sortedTranslationsObject = sortObject(translationsObject);

  // Convertir el objeto ordenado de nuevo a una cadena
  const sortedTranslationsObjectString = JSON.stringify(
    sortedTranslationsObject,
    null,
    2,
  ).replace(/"([^"]+)":/g, '$1:');

  // Sobrescribir el archivo con las entradas ordenadas
  const sortedTranslationsContent = translationsContent.replace(
    translationsObjectString,
    sortedTranslationsObjectString,
  );
  fs.writeFileSync(filePath, sortedTranslationsContent, 'utf-8');

  console.log(`Traducciones ordenadas alfabéticamente en ${filePath}`);
}

// Rutas a los archivos de traducciones
const enTranslationsPath = path.join(
  '/Users/daniel-hdez/Documents/marsinet/apps/marsinet/src/assets/i18n',
  'en.ts',
);
const esTranslationsPath = path.join(
  '/Users/daniel-hdez/Documents/marsinet/apps/marsinet/src/assets/i18n',
  'es.ts',
);

// Ordenar las traducciones en ambos archivos
sortTranslations(enTranslationsPath);
sortTranslations(esTranslationsPath);
