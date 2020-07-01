echo "Bygger spvedtak latest for docker compose utvikling"

npm i

npm run build
docker build . -f Dockerfile.spvedtak -t spvedtak:latest
