
async function employeeList(){

    const employee = [
        {
            id : 1,
            name : "Ravi",
            position : "Software developer" 
        },
        {
            id : 2,
            name : "Mahesh",
            position : "Software tester" 
        },
        {
            id : 3,
            name : "Arun",
            position : "Software analyst" 
        },
        {
            id : 3,
            name : "Charles",
            position : "Software architect" 
        }
    ]

    return {
        statusCode: 200,
        body: JSON.stringify(employee),
      };
}

export { employeeList };