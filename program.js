const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors');

const program = express();
const link = 'mongodb://localhost:27017';
const PORT = process.env.PORT || 3000;
const dbLink = 'program';

program.use(cors());
program.use(express.json());

program.listen(PORT, () => {
    console.log('Listening on http://localhost:${PORT}...');
});

program.get('/program/subject/',(req, res) => oreo(req, res));
program.get('/program/subject/',(req, res) => bites(req, res));
program.get('/program/subject',(req, res) => chips(req, res));

function oreo(req, res){
    MongoClient.connect(link)
    .then((client) => {
        const db = client.db(dbLink);
        const oreo = db.collection('course');

        oreo.find({})
        .toArray()
        .then((out) => {
            res.json(out);
        })
        .catch((err) =>{
            console.error('Error have occurred');
        })
        .finally(() =>{
            client.close();

        });

    })
    .catch((err) =>{
        console.error('Error cannot connect to database',err);
        res.status(500).send('Internal Server Error');

    });
}

function bites(req, res) {
    MongoClient.connect(link)
    .then((client) => {
        const db = client.db(dbLink);
        const cookies = db.collection('course');

        cookies.find({})
            .toArray()
            .then((result) => {
                
                const courses = [];
                result.forEach(year => {
                    Object.keys(year).forEach(semester => {
                        if (Array.isArray(year[semester])) {
                            year[semester].forEach(course => {
                                courses.push({
                                    name: course.description,
                                    specialization: course.tags[1] 
                                });
                            });
                        }
                    });
                });
                res.json(courses);
            })
        .catch((err) => {
            console.error('Error has occured', err);
            res.status(500).send('Internal Server Error');
        })
        .finally(() => {
            client.close();
        });
    })
    .catch((err) => {
        console.error('Error cannot connect to Database', err);
        res.status(500).send('Internal Server Error');
    });
}

function chips(req, res) {
    MongoClient.connect(link)
    .then((client) => {
        const db = client.db(dbLink);
        const lays = db.collection('course');

        lays.find({})
            .toArray()
            .then((result) => {
                
                const courses = [];
                result.forEach(year => {
                    Object.keys(year).forEach(semester => {
                        if (Array.isArray(year[semester])) {
                            year[semester].forEach(course => {
                                
                                if (course.tags.includes("BSIS") || course.tags.includes("BSIT")) {
                                    courses.push({
                                        name: course.description,
                                        specialization: course.tags.includes("BSIS") ? "BSIS" : "BSIT"
                                    });
                                }
                            });
                        }
                    });
                });
                res.json(courses);
            })
        .catch((err) => {
            console.error('Error has occured', err);
            res.status(500).send('Internal Server Error');
        })
        .finally(() => {
            client.close();
        });
    })
    .catch((err) => {
        console.error('Error cannot connect to Database', err);
        res.status(500).send('Internal Server Error');
    });
}