# Despliegue de la aplicación

## Extension de visual code

Debemos tener instalada la extension de visual code [Remote Explorer](https://marketplace.visualstudio.com/items?itemName=ms-vscode.remote-explorer)

## Configuración de extension

Nuestro archivo de configuraciín de ssh debe contener el siguiente texto. (Se debe cambiar el valor de `ruta_del_certificado_pem` por la ruta absoluta del archivo)

## Despliegue

```
Host Marsinet
    HostName 23.97.232.108
    IdentityFile ruta_del_certificado_pem
    User marsinet
```

Una vez conectados devemos acceder a la carpeta del proyecto en el servidor y ya podríamos ejecutar el script de despliegue con el siguiente comando.

```bash
bash deploy-dev.sh
```

## Despliegue Produccion

```
Host Marsinet-PROD
    HostName 172.205.244.195
    IdentityFile /Users/daniel-hdez/Documents/marsinet/scripts/marsinet-prod_key.pem
    User marsinet-prod
```
