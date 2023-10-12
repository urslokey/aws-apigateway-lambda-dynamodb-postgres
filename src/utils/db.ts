import { DataSource } from "typeorm";
import { Architecture } from "../entity/architecture.entity";
import { Employee } from "../entity/employee.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "my-db-instance.cnwbijs7gqcp.ap-south-1.rds.amazonaws.com",
    port: 5432,
    username: "postgres",
    password: "lokeY2094",
    database: "development",
    synchronize: true,
    logging: false,
    entities: [ Employee ,Architecture ],
    ssl : { rejectUnauthorized: false }
});
