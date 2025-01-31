const express = require('express');

const router = express.Router();
const {getUsers ,createUsers,loginUser,editUsers,deleteUsers}=require('../controllers/userController')

router.get('/',getUsers);
router.post('/register',createUsers );
router.put('/',editUsers)
router.post('/login',loginUser);
router.delete('/',deleteUsers);

module.exports = router;
