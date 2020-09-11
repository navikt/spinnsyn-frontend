echo "Bygger spinnsyn-frontend latest for docker compose utvikling"

npm i

npm run build
docker build . -f Dockerfile -t spinnsyn-frontend:latest
