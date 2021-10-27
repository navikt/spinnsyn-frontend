echo "Bygger spinnsyn-frontend latest for docker compose utvikling"

npm i

npm run build
docker build . -t spinnsyn-frontend:latest

