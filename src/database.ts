import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/jblog').then(db => console.log('Database is Connected')).catch(err => console.error(err));