echo "Bygger spvedtak latest for docker compose utvikling"

npm i

npm run build
docker build . -f Dockerfile -t spvedtak:latest
