let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// Connect with work model

let Work = require('../models/work');

/* CRUD operation */

/* READ operation */
/* Get route for the workout tracker */

router.get('/', async (req, res, next) => {
    try {
      const Workoutlist = await Work.find(); 
      res.render('workout/list', {
        title: 'Macro Tracker', 
        Workoutlist: Workoutlist
      });
    } catch (err) {
      console.error(err);
      // Handle error
      res.render('work', {
        error: 'Error on server'
      });
    }
  });
  
/* ADD operation */
/* Get route for displaying the Add-Page -- Create Operation */
router.get('/add', async (req, res, next) => {
  res.render('workout/add', {title: 'Add Excercise'})

});
/* Post route for processing the Add-Page -- Create Operation */
router.post('/add', async (req, res, next) => {
  let newWorkout = new Work({
      "name": req.body.name,
      "sets": req.body.sets,
      "reps": req.body.reps,
      "description": req.body.description,
      "targetMuscle": req.body.targetMuscle
  });
  try {
      await newWorkout.save();
      res.redirect('/workout-list');
  } catch (err) {
      console.log(err);
      res.status(500).send('Error occurred while adding the workout');
  }
});

/* EDIT operation */
/* Get route for displaying the Edit Operation -- Update Operation */
router.get('/edit/:id', async (req, res, next) => {
  let id = req.params.id;
  try {
    let workToEdit = await Work.findById(id);
    res.render('workout/edit', { title: 'Edit Exercise', work: workToEdit });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error occurred while fetching the workout for edit');
  }
});

/* Post route for displaying the Edit Operation -- Update Operation */
router.post('/edit/:id', async (req, res, next) => {
  let id = req.params.id;
  try {
    await Work.updateOne({_id: id}, {
      $set: {
        "name": req.body.name,
        "sets": req.body.sets,
        "reps": req.body.reps,
        "description": req.body.description,
        "targetMuscle": req.body.targetMuscle
      }
    });
    res.redirect('/workout-list');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error occurred while updating the workout');
  }
});

/* DELETE operation */
/* Get to perform Delete operation -- Remove Operation */
router.get('/delete/:id', async (req, res, next) => {
  let id = req.params.id;
  try {
      await Work.deleteOne({_id: id});
      res.redirect('/workout-list');
  } catch (err) {
      console.log(err);
      res.status(500).send('Error occurred while deleting the workout');
  }
});



module.exports = router;