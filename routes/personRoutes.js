const express = require("express");
const router = express.Router();
const Person = require('../models/Person');


//post route to add a person
router.post("/", async (req, res) => {
    try {
        const data = req.body;//assuming the request  body contains the person data
        //create new person decument using the mongoose model
        const newPerson = new Person(data);

        //save the new person to the database
        const response = await newPerson.save();
        console.log("data saved");
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "internal server error" });
    }
})


//get method to get the person
router.get("/", async (req, res) => {
    try {
        const data = await Person.find();
        console.log("data fetched");
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "internal server error" });
    }
})

router.get('/:work', async (req, res) => {
    try {
        const work = req.params.work;//extract the work type from the url parameter
        if (work == 'chef' || work == 'manager' || work == 'waiter') {
            const response = await Person.find({ work: work });
            console.log('reponse fetched');
            res.status(200).json(response);
        }
        else {
            res.status(404).json({ error: "invalid work type" });
        }

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "internal server error" });

    }
})

router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;//exact the id from the url parameter
        const updatedPersonData = req.body;//updated data for the person

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,//return the updated document
            runValidators: true,//run mongoose validation
        })

        if (!response) {
            return res.status(404).json({ error: "person not found" });
        }
        console.log("data updated");
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "internal server error" });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;

        const response = await Person.findByIdAndDelete(personId);

        if (!response) {
            return res.status(404).json({ error: "person not found" });
        }
        console.log("data delete");
        res.status(200).json({ message: "person delete successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "internal server error" });
    }
})
module.exports = router;
