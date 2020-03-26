const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: { 
        type: Date,
        default: () => new Date()
    },
    exercises: [
        {
            type: {
                type: String,
                trim: true,
                required: "A type must be entered"
            },
            name: { 
                type: String,
                trim: true,
                required: "A name must be entered"
            },
            weight: { 
                type: Number
            },
            sets: { 
                type: Number
            },
            reps: { 
                type: Number
            },
            duration: { 
                type: Number,
                required: "An exercise length must be entered"
            },
            distance: { 
                type: Number
            }
        }
    ]
},

{
    toJSON: { 
        virtuals: true
    }
}

);

WorkoutSchema.virtual("totalDuration").get(function() { 
    return this.exercises.reduce((total, exercise) => { 
        return total + exercise.duration;
    }, 0);
});


const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;