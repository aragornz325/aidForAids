# Servidor Express para prueba técnica de AidForAids

El servidor fue construido en **Express** por ser un framework muy conocido y escalable de node, cabe destacar que también lo podría haber hecho en **Nest.Js**, pero por razones de especificaciones opté por Express.

Tiene una conexión a una db local de **PostgreSQL**, en el archivo `.env` (el cual fue subido intencionalmente al repo) se deberá configurar una db con user y password.

Por especificaciones se instaló y configuró **Prisma** para interactuar con la db.

El servidor corre en la dirección `localhost:3000/api`.

En `/user` están los endpoints del dominio de los usuarios y en `/products` los del dominio de los productos. En el repo se deja un archivo json para importar los endpoint en **Insomnia** y hacer las pruebas.

La seguridad del servidor maneja dos niveles, primero una **API key** de manera global + **CORS**. Luego los endpoint pueden o no requerir un token (esto se configura por cada uno de los endpoint dado que hay recursos que no se necesitaría estar logueado para usarlos,  en este caso específico que hablamos de un e-commerce el endpoint de `getAllProducts` debería estar disponible para cualquier request dado que para limpiar los productos no necesitamos estar registrado ni loggeados).

Por razones de tiempo no se pueden implementar la seguridad en todos los endpoint pero las funciones están disponibles para que sean aplicadas de acuerdo a la lógica de negocio.

## Recursos útiles

- [Express](https://expressjs.com)
- [PostgreSQL](https://www.postgresql.org)
- [Prisma](https://www.prisma.io)
- [Insomnia](https://insomnia.rest)
