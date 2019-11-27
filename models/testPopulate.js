// var mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost/cruhotelx");
// mongoose.Promise = global.Promise;
// var Schema = mongoose.Schema;


// const personSchema = Schema({
//     _id: Schema.Types.ObjectId,
//     name: String,
//     age: Number,
//     stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
// });

// const storySchema = Schema({
//     author: { type: Schema.Types.ObjectId, ref: 'Person' },
//     title: String,
//     fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
// });

// const Story = mongoose.model('Story', storySchema);
// const Person = mongoose.model('Person', personSchema);
// const author = new Person({
//     _id: new mongoose.Types.ObjectId(),
//     name: 'Thanapon Joosakul',
//     age: 23
//   });

// const author = new Person({
//     _id: new mongoose.Types.ObjectId(),
//     name: 'test2',
//     age: 33
// })

// author.save(function(err) {
//     if(err) console.log(err);
// })

// const story1 = new Story({
//     title: 'Casino Royale',
//     author: author._id    // assign the _id from the person
// });


//     const story1 = new Story({
//         title: 'Casino Royale',
//         author: author._id    // assign the _id from the person
//     });

//     story1.save(function (err) {
//         if (err) return handleError(err);
//         // thats it!
//     });
// });
// Story.findOne().populate('author').exec((err, data) => {
//     console.log(data);
// })

