¿Cómo se puede acceder a la base de datos de la versión del código que está en producción? ¿Cómo podemos manejarnos en azure para ver esto? Porque entendemos que los datos se guardan en azure, pero no sabemos cómo acceder a ellos.

Hay que accder mediante un ssh inverso para "bindear" el puerto de la maquina de la base de datos (5050) con el de tu maquina. Luego se puede acceder con cualquier cliente de postgresql.

¿Cómo se pueden subir los cambios que hagamos en el código si estamos trabajando en una versión local y el código está en un repositorio diferente? ¿En qué repositorio está el código de la versión de la aplicación que está en producción?

El tamaño máximo que el servidor admite para los archivos JSON que subimos cuando llamamos a la api, sigue siendo bajo. ¿Cómo podemos modificar el código para hacer este cambio?
En el archivo `apps/api/src/main.ts` actualmente puesto en limit: '700mb'
