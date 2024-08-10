# Limpiar dependencias antiguas de npm
rm -rf node_modules

# Instalar dependencias con menor uso de RAM
NODE_OPTIONS="--max-old-space-size=512" npm ci --prefer-offline

# Generar cliente Prisma
npx prisma generate

# Construir aplicaciones con Nx para producción, limitando el uso de RAM
NODE_OPTIONS="--max-old-space-size=512" nx build mypaw --skip-nx-cache --max-workers=1 --prod
NODE_OPTIONS="--max-old-space-size=512" nx build api --skip-nx-cache --max-workers=1 --prod


# Desplegar archivos compilados
sudo rm -rf /usr/share/nginx/html/mypaw.com/
sudo mkdir -p /usr/share/nginx/html/mypaw.com
sudo mv dist/apps/mypaw/* /usr/share/nginx/html/mypaw.com/

# Reiniciar la API con PM2
pm2 delete api || true; # Ignorar si el proceso no existe
PORT=3333 pm2 start dist/apps/api/main.js --name api -i max --node-args="--max-old-space-size=1024" --max-memory-restart=512M --update-env
pm2 save;
