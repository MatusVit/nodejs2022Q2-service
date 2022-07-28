# Home Library Service

## Downloading

```bash
git clone https://github.com/MatusVit/nodejs2022Q2-service.git
```

```bash
git checkout docker
```

## Installing NPM modules

```bash
npm install
```

## Running application with Docker

- **development mode**

  - run
    ```bash
    npm run up:dev:docker
    ```
  - stop
    ```bash
    npm run down:dev:docker
    ```

- **production mode**

  _NOTE. Images will be downloaded from DockerHub_

  - run
    ```bash
    npm run up:prod:docker
    ```
  - stop
    ```bash
    npm run down:prod:docker
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
