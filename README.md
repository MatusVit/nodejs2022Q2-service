# Home Library Service

## Downloading

```bash
git clone https://github.com/MatusVit/nodejs2022Q2-service.git
```

```bash
git checkout database
```

## Running application for production

- set up the environment variables in `.env` file. Use `.env.example`
- build and run containers
  ```bash
  npm run up:prod:docker
  ```
- stop

  ```bash
  npm run down:prod:docker
  ```

  After starting the app on port (4000 as default) you can open in your browser OpenAPI documentation by typing http://localhost:4000/doc/.

## Installing for local development

- set up the environment variables in `.env` file. Use `.env.example`
- install packages
  ```bash
  npm ci
  ```
- build and run containers
  ```bash
  npm run up:dev:docker
  ```

## Running application for local development

- run
  ```bash
  npm run up:dev:docker
  ```
- stop
  ```bash
  npm run down:dev:docker
  ```
  After starting the app on port (4000 as default) you can open
  in your browser OpenAPI documentation by typing http://localhost:4000/doc/.

## Testing

_NOTE. Packages must be installed to run tests._

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
