const mongoose = require('mongoose');
const { Schema } = mongoose
// Define the Mongoose schema for the task
const TaskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: [true, 'Task Name is required'],
    minlength: [1, 'Task Name must be at least 1 character long'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [1, 'Description must be at least 1 character long'],
  },
  endTime: {
    type: Date,
    required: [true, 'End Time is required'],
    validate: {
      validator: function (value) {
        // Ensure the endTime is a valid future date
        return value && value > Date.now();
      },
      message: 'End Time must be a future date.',
    },
  },
  timeToSpend: {
    type: Number,
    required: [true, 'Time to Spend is required'],
    
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  }
  
}, { versionKey: false });

// Create Mongoose model
const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
