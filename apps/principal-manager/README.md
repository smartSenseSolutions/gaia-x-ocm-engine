# OCM Principal Manager

## Description
<hr/>

The Principal Manager is the microservice responsible for handling the authentication and credential issuance for an individual PCM user.

## Usage
<hr/>

###  Swagger Documentation: 

[Swagger/OpenAPI](swagger.json)

## Installation
<hr/>

### Pre-requisite

* yarn
* docker
* docker-compose
* Postgres


### OCM Services Dependencies

* SSI Abstraction

## Running the app
<hr/>

**Each service in the Organizational Credential Manager can be run from the infrastructure repository with Docker.**

**The .env files are in the infrastructure repository under /env**

```bash
    ## production in:
      ./deployment/ci
    ## development in:
      ./deployment/dev
```

* (optional) Edit docker-compose.yml in "infrastructure" to use either **/ci/** or **/dev/** Dockerfiles.

* Run while in **"infrastructure"** project:
```bash
$ docker-compose up --build attestation-m
```
to run only Attestation Manager or
```bash
$ docker-compose up --build
```
to run all the services.

## Build
```
yarn build
```

## Run
```
yarn start
```

### Environment variable required
```
1. PORT
2. DATABASE_URL
3. ECSURL
4. NATS_URL
5. AGENT_URL
```

### Outgoing communication services
```
1. CONNECTION MANAGER
```

### Incoming communication services
```
1. ATTESTATION MANAGER
```

## Features supported
```
1. Issue Membership credential
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## GDPR
<hr/>

[GDPR](GDPR.md)

## Dependencies
<hr/>

[Dependencies](package.json)

## License
<hr/>
 
 [Apache 2.0 license](LICENSE)
