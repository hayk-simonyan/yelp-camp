const mongoose = require('mongoose');

const Campground = require('./models/campground');
const Comment    = require('./models/comment');

const data = [
    {
        name: 'Clouds Rest',
        image: 'https://images.unsplash.com/photo-1480779735619-f73b30fdc062?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores ipsa quia laborum assumenda nemo voluptas! At dolor facere deleniti tempora velit perspiciatis quidem voluptatem doloribus debitis architecto laudantium assumenda consequuntur illum, dignissimos incidunt, quos eligendi iure quam! Quae at maxime sit ipsum nesciunt fuga eius sint. Blanditiis eum exercitationem delectus soluta illum ex eos aperiam sit qui excepturi, est fugit.'
    },
    {
        name: 'Clouds Rest',
        image: 'https://images.unsplash.com/photo-1538135901208-b7bc0a074a56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=633&q=80',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores ipsa quia laborum assumenda nemo voluptas! At dolor facere deleniti tempora velit perspiciatis quidem voluptatem doloribus debitis architecto laudantium assumenda consequuntur illum, dignissimos incidunt, quos eligendi iure quam! Quae at maxime sit ipsum nesciunt fuga eius sint. Blanditiis eum exercitationem delectus soluta illum ex eos aperiam sit qui excepturi, est fugit.'
    },
    {
        name: 'Clouds Rest',
        image: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores ipsa quia laborum assumenda nemo voluptas! At dolor facere deleniti tempora velit perspiciatis quidem voluptatem doloribus debitis architecto laudantium assumenda consequuntur illum, dignissimos incidunt, quos eligendi iure quam! Quae at maxime sit ipsum nesciunt fuga eius sint. Blanditiis eum exercitationem delectus soluta illum ex eos aperiam sit qui excepturi, est fugit.'
    },
    {
        name: 'Clouds Rest',
        image: 'https://images.unsplash.com/photo-1500332988905-1bf2a5733f63?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores ipsa quia laborum assumenda nemo voluptas! At dolor facere deleniti tempora velit perspiciatis quidem voluptatem doloribus debitis architecto laudantium assumenda consequuntur illum, dignissimos incidunt, quos eligendi iure quam! Quae at maxime sit ipsum nesciunt fuga eius sint. Blanditiis eum exercitationem delectus soluta illum ex eos aperiam sit qui excepturi, est fugit.'
    },
    {
        name: 'Clouds Rest',
        image: 'https://images.unsplash.com/photo-1477581265664-b1e27c6731a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores ipsa quia laborum assumenda nemo voluptas! At dolor facere deleniti tempora velit perspiciatis quidem voluptatem doloribus debitis architecto laudantium assumenda consequuntur illum, dignissimos incidunt, quos eligendi iure quam! Quae at maxime sit ipsum nesciunt fuga eius sint. Blanditiis eum exercitationem delectus soluta illum ex eos aperiam sit qui excepturi, est fugit.'
    },
    {
        name: 'Clouds Rest',
        image: 'https://images.unsplash.com/photo-1539712258047-fd138a7e6737?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores ipsa quia laborum assumenda nemo voluptas! At dolor facere deleniti tempora velit perspiciatis quidem voluptatem doloribus debitis architecto laudantium assumenda consequuntur illum, dignissimos incidunt, quos eligendi iure quam! Quae at maxime sit ipsum nesciunt fuga eius sint. Blanditiis eum exercitationem delectus soluta illum ex eos aperiam sit qui excepturi, est fugit.'
    },
];

function seedDB() {
    Campground.remove({}, function(err) {
        if(err) console.log(err);
        data.forEach(function(seed) {
            Campground.create(seed, function(err, campground) {
                if(err) console.log(err);
                else {
                        {
                            text: 'I wish there was an internet',
                            author: 'Homer'
                        }, function(err, comment) {
                            if(err) console.log(err);
                            else {
                                campground.comments.push(comment);
                                campground.save();
                            };
                        }
                    );
                };
            });
        });
    });
};

module.exports = seedDB;