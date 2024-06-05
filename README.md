#   Employees Routes
*  get all employees: '/employees' | **GET**
*  get employees by div: '/employees/:employee_id' | **GET**
*  get employees by id: '/employees/:id/detail' | **GET**
*  create employee: '/employees' | **POST**
    ```
    req.body = {
        employee_id: "...",
        name: "...",
        division: "...",
        role: "...",
    }
    ```
*  delete employee: '/employees/:id' | **DELETE**

#  Tickets Routes
*  get all tickets: '/tickets' | **GET**
*  get tickets by status and div: '/tickets/:employee_id/:status' | **GET**
*  get tickets by user and status: '/tickets/:status/user/:employee_id' | **GET**
*  get ticket by id: '/tickets/:id' | **GET**
*  create ticket: '/tickets/:employee_id' | **POST**
    ```
    req.body = {
        title: "...",
        description: "...",
        divisi: "requested-div"
    }
    ```
*  update ticket: '/tickets/:ticket_id/:user_id' | **PATCH**
    ```
    if :user_id = assigner:
        req.body = {
            employee_id: to-be-assinged-employee-id, 
            deadline: "..."
            }
    else: req.body = {}
    ```
*  soft-delete ticket: '/tickets/:ticket_id' | **PATCH**
    ```
    req.body = {}
    ```
*  delete ticket: '/tickets/:id' | **DELETE**

#  Status
* new 
* pending
* process
* QC
* done

#  Role
* Assigner
* QC

#  Division
* IT
* LnD
* HRGA
* Marketing
* BusDev

#  Migrate
* sequelize-cli db:migrate
* sequelize-cli db:migrate:all
* sequelize-cli db:migrate:undo
* sequelize-cli db:migrate:undo:all

#  Seed
* sequelize-cli db:seed:all
* sequelize-cli db:seed:undo:all