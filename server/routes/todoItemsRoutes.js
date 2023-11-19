const router = require ('express').Router();

//import todo model
const todoItemsModel = require('../models/todoItems');

//routes
router.post('/api/item', async (req, res) => {
    try {
        const newItem = new todoItemsModel({
            item: req.body.item
        });

        // Save to the database
        const result = await newItem.save();
        console.log('Result of save operation:', result);

        res.json({ message: 'Item added successfully' });
    } catch (error) {
        console.error('Error saving item to database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/api/items', async (req, res) => {
    try {
        const allTodoItems = await todoItemsModel.find({});
        res.status(200).json({message: 'All items get successfully', allTodoItems})
    } catch (error) {
        
    }
})

router.put('/api/item/:id', async (req, res) => {
    try {
        const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, {$set: req.body})
        res.status(200).json({message: 'Item updated!', updateItem})
    } catch (error) {
        
    }
})

router.delete('/api/item/:id', async (req, res) => {
    try {
        const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
        res.status(200).json({message: 'Item deleted', deleteItem})
    } catch (error) {
        
    }
})

//export router
module.exports = router;