//Easter egg
let EasterEgg = {
    
    //if search matches easter egg searches
    isEggs(input) {
        if (input == "SELU CMPS" || input == "CMPS SELU" || input == "cmps selu" || input == "selu cmps" || 
        input == "tutors" || input == "Tutors" || input == "tutor" || input == "Tutor" || 
        input == "questions" || input == "question" || input == "Questions" || input == "Question") {
            return true;
        }
        else
            return false;
    },

    //returns easter egg corresponding to search
    getEggs(input) {
        if (input == "SELU CMPS" || input == "CMPS SELU" || input == "cmps selu" || input == "selu cmps") {
            return [{ "publisher": "(985) 549-5099", "title": "Ghassan Alkadi", "recipe_id": "GhassanAlkadi", 
            "source_url": "http://southeastern.edu/acad_research/depts/cs_it/faculty/images/ghassan.jpg", 
            "image_url": "http://southeastern.edu/acad_research/depts/cs_it/faculty/images/ghassan.jpg" },
            { "publisher": "(985) 549-2189", "title": "Lu Yuan", "recipe_id": "LuYuan", 
            "image_url": "http://southeastern.edu/acad_research/depts/cs_it/faculty/images/luweb.jpg", 
            "source_url": "http://southeastern.edu/acad_research/depts/cs_it/faculty/images/luweb.jpg" },
            { "publisher": "(985) 549-5314", "title": "John Burris", "recipe_id": "JohnBurris", 
            "image_url": "http://southeastern.edu/acad_research/depts/cs_it/faculty/images/burris_web.jpg", 
            "source_url": "http://southeastern.edu/acad_research/depts/cs_it/faculty/images/burris_web.jpg" },
            { "publisher": "(985) 549-2314", "title": "Mike Asoodeh", "recipe_id": "MikeAsoodeh", 
            "image_url": "http://southeastern.edu/acad_research/depts/cs_it/faculty/images/assodeh2.jpg", 
            "source_url": "http://southeastern.edu/acad_research/depts/cs_it/faculty/images/assodeh2.jpg" },
            { "publisher": "(985) 549-5315", "title": "Cris Koutsougeras", "recipe_id": "CrisKoutsougeras", 
            "image_url": "http://southeastern.edu/acad_research/depts/cs_it/faculty/images/crisweb.jpg", 
            "source_url": "http://southeastern.edu/acad_research/depts/cs_it/faculty/images/crisweb.jpg" },
            { "publisher": "(985) 549-5506", "title": "Patrick McDowell", "recipe_id": "PatrickMcDowell", 
            "image_url": "http://southeastern.edu/acad_research/depts/cs_it/faculty/images/mcdowell.jpg", 
            "source_url": "http://southeastern.edu/acad_research/depts/cs_it/faculty/images/mcdowell.jpg" },
            { "publisher": "(985) 549-5505", "title": "Steele Russell", "recipe_id": "Steele Russell", 
            "image_url": "http://southeastern.edu/acad_research/depts/cs_it/faculty/images/steeleweb.jpg", 
            "source_url": "http://southeastern.edu/acad_research/depts/cs_it/faculty/images/steeleweb.jpg" },
            { "publisher": "(985) 549-5105", "title": "Allanagh Sewell", "recipe_id": "AllanaghSewell", 
            "image_url": "http://southeastern.edu/acad_research/depts/cs_it/faculty/images/sewell1.jpg", 
            "source_url": "http://southeastern.edu/acad_research/depts/cs_it/faculty/images/sewell1.jpg" },
            { "publisher": "(985) 549-3769", "title": "Omer M. Soysal", "recipe_id": "OmerMSoysal", 
            "image_url": "http://southeastern.edu/acad_research/depts/cs_it/faculty/images/omer.jpg", 
            "source_url": "http://southeastern.edu/acad_research/depts/cs_it/faculty/images/omer.jpg" },
            { "publisher": "(985) 549-5088", "title": "Kuo-Pao Yang", "recipe_id": "Kuo-PaoYang", 
            "image_url": "http://southeastern.edu/acad_research/depts/cs_it/faculty/images/paoweb.jpg", 
            "source_url": "http://southeastern.edu/acad_research/depts/cs_it/faculty/images/paoweb.jpg" }]
        }
        else if (input == "tutors" || input == "Tutors" || input == "tutor" || input == "Tutor") {
            return [{ "publisher": "This is Joshua Wetzel", "title": "Joshua Wetzel", "recipe_id": "JoshuaWetzel", "image_url": 
            "https://scontent.fbtr1-1.fna.fbcdn.net/v/t1.0-0/p110x80/10577110_707219412660765_636685016534560017_n.jpg?oh=cd6d57cb62c84c6d3d0a7775e8f4050c&oe=5A7B1627", 
            "source_url": 
            "https://scontent.fbtr1-1.fna.fbcdn.net/v/t1.0-0/p110x80/10577110_707219412660765_636685016534560017_n.jpg?oh=cd6d57cb62c84c6d3d0a7775e8f4050c&oe=5A7B1627" },
            { "publisher": "Definitely not him", "title": "Not Joshua Wetzel", "recipe_id": "notJoshuaWetzel", "image_url": 
            "https://scontent.fbtr1-1.fna.fbcdn.net/v/t1.0-0/p110x80/10577110_707219412660765_636685016534560017_n.jpg?oh=cd6d57cb62c84c6d3d0a7775e8f4050c&oe=5A7B1627", 
            "source_url": 
            "https://scontent.fbtr1-1.fna.fbcdn.net/v/t1.0-0/p110x80/10577110_707219412660765_636685016534560017_n.jpg?oh=cd6d57cb62c84c6d3d0a7775e8f4050c&oe=5A7B1627" },
            { "publisher": "Awful, just awful", "title": "Cory Clapp", "recipe_id": "CoryClapp", "image_url": 
            "https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAeoAAAAJGYzYjM5MmMyLWY3NzYtNDg5ZC1iMzk5LTIzY2Q3Y2UwZWEwNg.jpg", 
            "source_url": "https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAeoAAAAJGYzYjM5MmMyLWY3NzYtNDg5ZC1iMzk5LTIzY2Q3Y2UwZWEwNg.jpg" },
            { "publisher": "He prefers backend development", "title": "Michael Hutto", "recipe_id": "MichaelHutto", "image_url": 
            "https://scontent-dft4-2.xx.fbcdn.net/v/t1.0-9/377931_490996110911615_1972897439_n.jpg?oh=897376560e6b70b6a22512fbdd6994e5&oe=5AAC03C7", 
            "source_url": "https://scontent-dft4-2.xx.fbcdn.net/v/t1.0-9/377931_490996110911615_1972897439_n.jpg?oh=897376560e6b70b6a22512fbdd6994e5&oe=5AAC03C7" }]
        }
        else if (input == "questions" || input == "question" || input == "Questions" || input == "Question") {
            return [{ "publisher": "I have a question", "title": "Cory Clapp", "recipe_id": "CoryClappQ", 
            "image_url": "https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAeoAAAAJGYzYjM5MmMyLWY3NzYtNDg5ZC1iMzk5LTIzY2Q3Y2UwZWEwNg.jpg", 
            "source_url": "https://www.google.com/maps/search/gun+store+app/@30.3120449,-90.990093,11z/data=!3m1!4b1" }]
        }
    }
}

export default EasterEgg;