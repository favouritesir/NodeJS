/*
* Title: environment
* Description: all environments for the project 
* Author: Ashikur Rahman SA
* Date: Thursday, 27 -June-2024 (16:49:00)
*
*/
// Dependencies


// env object - scaffolding
const env = {};

// Programme start
env.staging={
    port:3000,
    nm:"staging"
}
env.production={
    port:4000,
    nm:"production"
}

// choose environment
const currentEnv=typeof(process.env.status)==='string'?process.env.status:'staging';



// Export the env obj
module.exports=env[currentEnv]||env.staging;