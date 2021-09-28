echo "Bygger spinnsyn-frontend latest for docker compose utvikling"

npm i

npm run build
cd server
npm i
npm run build
cd ..
docker build . -t spinnsyn-frontend:latest

