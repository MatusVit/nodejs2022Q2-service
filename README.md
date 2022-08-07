# Home Library Service

## Downloading

```bash
git clone https://github.com/MatusVit/nodejs2022Q2-service.git
```

```bash
git checkout authentication
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

## Logging

_NOTE. Log files are created in the folder `./logs`._

_NOTE. Log level by default is 4._

0-4 ['error', 'warn', 'log', 'debug', 'verbose']

Select log-level change `LOG_LEVEL` in `.env` file

## Testing

_NOTE. Packages must be installed to run tests._

After application running open new terminal and enter:
To run all tests

```bash
npm run test:auth
```

To run only one of all test suites

```bash
npm run test:auth test/users.e2e-spec.ts
```

```bash
npm run test:auth test/albums.e2e-spec.ts
```

```bash
npm run test:auth test/artists.e2e-spec.ts
```

```bash
npm run test:auth test/tracks.e2e-spec.ts
```

```bash
npm run test:auth test/favorites.e2e-spec.ts
```
