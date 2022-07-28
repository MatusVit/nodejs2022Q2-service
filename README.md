# Home Library Service

## Downloading

```bash
git clone https://github.com/MatusVit/nodejs2022Q2-service.git
```

## Running application with Docker

in docker branch

```bash
git checkout docker
```

### development mode

```bash
docker-compose -f docker-compose.development.yml up
```

### production mode

```bash
docker-compose -f docker-compose.production.yml up
```

## Downloading Docker Images

```bash
 docker pull matvi/music-library:server
```

```bash
docker pull matvi/music-library:db
```

## Scanning Docker local image

```bash
npm run scan
```

## Installing NPM modules

```bash
npm install
```

## Running application for local development

```bash
npm start
```

or

```bash
npm run start:dev
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.

## Testing

After application running open new terminal and enter:

To run all tests

```bash
npm run test
```

To run only one of all test suites

```bash
npm run test test/users.e2e-spec.ts
```

```bash
npm run test test/albums.e2e-spec.ts
```

```bash
npm run test test/artists.e2e-spec.ts
```

```bash
npm run test test/tracks.e2e-spec.ts
```

```bash
npm run test test/favorites.e2e-spec.ts
```
