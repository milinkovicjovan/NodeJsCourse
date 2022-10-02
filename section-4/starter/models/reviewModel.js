// review / rating / createdAt / ref to tour / ref to user
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty!'],
    },
    ratting: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'review must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
  //  all this does is to really make sure
  //  that when we have a virtual property,
  //  basically a field that is not stored in the database
  //  but calculated using some other value.
  //  So we want this to also show up whenever there is an output.
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'tour',
    select: 'name', // we only want tour name
  }).populate({
    path: 'user',
    select: 'name photo', // we only want name and photo of user
  });

  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
