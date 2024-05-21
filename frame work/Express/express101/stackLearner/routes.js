const router=require('express').Router();
const {homeController,aboutController}=require('./controller')

router.get("/",homeController)
router.get("/about",aboutController)  

module.exports=router