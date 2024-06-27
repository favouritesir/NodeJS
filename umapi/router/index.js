/*
* Title: Routes
* Description: routes for umapi projects
* Author: Ashikur Rahman SA
* Date: Monday, 24 -June-2024 (11:25:52)
*
*/
// Dependencies
const { about } = require("./about");
const { notFound } = require("./notFound");



// App object - Module scaffolding
const routes = {
    notFound,about
};

// export
module.exports=routes;
