const Note = require('../models/noteModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllNotes = catchAsync(async (req, res, next) => {
  const notes = await Note.find();

  res.status(200).json({
    status: 'success',
    data: { notes },
  });
});

exports.getNote = catchAsync(async (req, res, next) => {
  const note = await Note.findById(req.params.id);

  if (!note) return next(new Error('No Note found with that ID'));

  res.status(200).json({
    status: 'success',
    data: { note },
  });
});

exports.createNote = catchAsync(async (req, res, next) => {
  const newNote = await Note.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { newNote },
  });
});

exports.updateNote = catchAsync(async (req, res, next) => {
  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedNote) return next(new Error('No Note found with that ID'));

  res.status(201).json({
    status: 'success',
    data: { updatedNote },
  });
});

exports.deleteNote = catchAsync(async (req, res, next) => {
  const note = await Note.findByIdAndDelete(req.params.id);

  if (!note) return next(new Error('No Note found with that ID'));

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
