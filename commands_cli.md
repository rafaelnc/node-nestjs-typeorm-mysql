
### Generate Migrations ###
npm run typeorm:migration:generate --n create-product

### Create Migrations ###
npm run typeorm:migration:create --n create-product

### Execute Migrations ###
npm run typeorm:migration:run

### Nest Create Module ###
nest generate module product

### Nest Create Controller ###
nest generate controller product --no-spec

### Nest Create Service ###
nest generate service product

### Start Project Dev Mod ###
npm run dev

### Start Test ###
npm run test

### EXECUTE NPM IN DOCKER CONTAINER Example ####
docker/npm run typeorm:migration:run