const express=require('express')
const { addTransactions, getAllTransactions,editTransaction,deleteTransaction } = require('../controller/transactionController')


const router=express.Router()

//adding transanction
router.post('/add-transaction',addTransactions)

//getting all transactions
router.post("/get-transaction",getAllTransactions)

//edit transactions
router.post("/edit-transaction",editTransaction);

//delete transaction
router.post("/delete-transaction",deleteTransaction);
module.exports=router;