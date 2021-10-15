const router = require('express').Router();
const Workout = require('../../models/Workout.js');


router.get("/", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {$sum: "$exercises.duration"},
                totalDistance: {$sum: "$exercises.distance"}
            }
        }
    ]).then(data => {
        res.json(data);
    }).catch(err => {
        res.status(400).json(err);
    });
});

router.post("/", (req, res) => {
    Workout.create(req.body)
    .then(data => {
        res.json(data);
    }).catch(err => {
        res.status(400).json(err);
    });
});

router.put("/:id", (req, res) => {
Workout.findOneAndUpdate({ _id: req.params.id }, { $push: { exercises: req.body }})
    .then(data => {
        res.json(data);
    }).catch (err => {
        console.log(err);
        res.status(400).json(err);
    });
});

router.get("/range", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {$sum: "$exercises.duration"},
                totalWeight: {$sum: "$exercises.weight"}
            },
        }
    ]).then(data => {
        const day = data.slice(-7);
        res.json(day);
    }).catch(err => {
        res.status(400).json(err);
    });
});

module.exports = router;