npm run dev

docker-compose up -d
 
npx sequelize-cli model:generate --name Production --attributes name:string,plu:number,quantity:number