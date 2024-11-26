import { Movies } from "../../models/movie/index.js";

export const getAllMovie = async (query) => {

    try {   
        const {limit , page }  = query;   
        
        const options = {
            limit: parseInt(limit), 
            skip: (page - 1) * limit
        };  
        const movies = await Movies.find({})
        .limit(options.limit)
        .skip(options.skip);
    
        
        const totalCount = await Movies.countDocuments();

        return {
            movies,
            totalCount
        }
    } catch (error) {
        throw new Error(error.message);
    }
  
} 

export const getMovieByTitle = async (value) => {
    console.log(value);
    
    try {
        const movie = await Movies.aggregate([ 
            {  $search: {
                    index: 'search',
                    text: {
                        query: value.title,
                        path: 'title',
                    }
            }},
    
            {
                $project: {
                    title: 1,
                    languages :1 ,
                    poster : 1 ,
                    'tomatoes.production' : 1,
                    countries : 1,
                }
            }
        ])
        // console.log(movie)
        
        if (!movie) {
            throw new Error("Error: Couldn't find Movie");
        }
        // console.log(movie.hash);
        
        
        return movie;  
    } catch (error) {
        throw new Error(error.message);  
    }
};

export const getMovieById = async (value) => {
    try {
        const movie = await Movies.findById(value.value)
        if (!movie) {
            throw new Error("Error: Couldn't find Movie");
        }
        return movie;  
    } catch (error) {
        throw new Error(error.message);  
    }
}

export const getTopMovie = async (value) => {
    // console.log(value.title);
    // console.log(value.id    );
    
    try {
        const movie = await Movies
        .find({
            'imdb.rating' : {$gte : 8   }
        })
        .sort({ 'imdb.rating': -1 })
        .limit(10)
        .select({ title: 1, imdb : 1 ,poster : 1})        
        if (!movie) {
            throw new Error("Error: Couldn't find Movie");
        }
        // console.log(movie.hash);
        console.log(movie.length);
        
        
        return movie;  
    } catch (error) {
        throw new Error(error.message);  
    }
}
export const getProductionMovie = async (value) => {
    try {
        const movie = await Movies
        .aggregate([
            {$match : { 'imdb.rating': { $gte:  8  }, genres: value.genres }},
            {$project : {poster :1, title :1, imdb : 1,genres :1}},
            { $sort: { 'imdb.rating': -1 }},
            {$limit : 10}
        ])
        // console.log(movie.length);
        if (movie.length < 10) {
            // Fetch thêm phim nếu chưa đủ 10
            const additionalMovies = await Movies.aggregate([
                {$match: {'imdb.rating': {$gte: 8}, genres: {$ne: value.genres}}},
                {$project: {poster: 1, title: 1, imdb: 1, genres: 1}},
                {$sort: {'imdb.rating': -1}},
                {$limit: 10 - movie.length} 
            ]);
            movie.push(...additionalMovies); // Thêm vào danh sách phim hiện có
        }
        
        return movie;  
    } catch (error) {
        throw new Error(error.message);  
    }
}
export const getHoolyWoodMovie = async (value) => {
    try {
        const movie = await Movies
        .aggregate([
            {$match : { 'awards.wins': {$gte : 150 } }},
            {$project : {poster :1, title :1, imdb : 1, awards  :1 }},
            { $sort: {  'awards.wins' : -1}},
            {$limit : 10}
        ])
        console.log(movie.length);
        
        
        return movie;  
    } catch (error) {
        throw new Error(error.message);  
    }
}

export const getMovieSettings = async (year ,rating , genres) => {
    try {
        // console.log(year ,rating , genres);
        
        // console.log(value);
        
        // const movie = await Movies
        // .aggregate([
        //     {$match : {  'imdb.rating': { $gte:  value.rating } , genres : {$in  : [value.genres]} }},
        //     {$project : {poster :1, title :1, imdb : 1, genres : 1 }},
        //     {$sort : { years : {}}}
        //     // {$limit : value.limit}
        // ])
        
        // if (!movie) {
        //     throw new Error("Error: Couldn't find Movie");
        // }
        
        // return movie;  
    } catch (error) {
        throw new Error(error.message);  
    }
}