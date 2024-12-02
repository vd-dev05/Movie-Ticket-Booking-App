import { Movies } from "../../models/movie/index.js"
import { v2 as cloudinary } from 'cloudinary'
import { log } from "console"
import fs from 'fs'
import mongoose from "mongoose"
const adminController = {
    loginAdmin: async (req, res) => {
        try {
            res.status(200).json({
                message: "Admin Login Successful",
                success: true,
                data: null
            })
        } catch (error) {
            return res.status(403).json({ message: "Admin Login Error", error: error.message })
        }

    },
    createMovie: async (req, res) => {
        try {

            const { title, plot, genres, runtime, cast, fullplot, languages, released, directors, writers, awards, imdb, countries, type, poster, trailer, production, year } = req.body.value;
           
            // const data = {
            //     title,
            //     plot,
            //     genres,
            //     runtime,
            //     cast,
            //     fullplot,
            //     languages,
            //     released,
            //     directors,
            //     writers,
            //     awards: {
            //         win: awards.split(',')[0],
            //         nominations: awards.split(',')[1],
            //         text: awards.split(',')[2]
            //     },
            //     imdb: {
            //         rating: imdb.split(',')[0],
            //         votes: imdb.split(',')[1],
            //     },
            //     countries,
            //     type,
            //     poster,
            //     trailer,
            //     lastupdated: new Date(),
            //     tomatoes: {
            //         production : production
            //     },
            //     year 
            // }
            const movie = await Movies.create({
                    title,
                    plot,
                    genres,
                    runtime,
                    cast,
                    fullplot,
                    languages,
                    released,
                    directors,
                    writers,
                awards: {
                    wins: awards.split(',')[0],
                    nominations: awards.split(',')[1],
                    text: awards.split(',')[2]
                },
                imdb: {
                    rating: imdb.split(',')[0],
                    votes: imdb.split(',')[1],
                },
                countries,
                type,
                poster,
                trailer,
                lastupdated: new Date(),
                tomatoes: {
                    production : production
                },
                year
            })
            res.status(200).json({
                message: "Movie created successfully",
                success: true,
                data: movie
            })
            


            //   const movie = await Movies.create({

            //   })
        } catch (error) {
            return res.status(403).json({ message: "Error creating movie", error: error.message })
        }
    },
    uploadMovie: async (req, res) => {
        try {
            const file = req.file

            const dataUrl = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
            const fileName = file.originalname.split('.')[0];

            const result = await cloudinary.uploader.upload(dataUrl, {
                public_id: fileName + "logo" + Math.floor(10) * 2024,
                resource_type: 'auto',
                folder: 'folder-movie',
            });
            res.status(200).json({
                success: true,
                url: result.secure_url
            })




        } catch (error) {
            return res.status(403).json({ message: "Error uploading movie", error: error.message })
        }
    },
    uploadTrailer: async (req, res) => {
        const file = req.file
        const fileName = file.originalname.split('.')[0];
        try {

            const result = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        public_id: `${fileName}_video_${Date.now()}`, // Create a unique public_id based on file name and timestamp
                        resource_type: 'video', // Important for video upload
                        folder: 'folder-video', // Cloudinary folder
                    },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                );

                uploadStream.end(file.buffer);
            });
            res.status(200).json({
                success: true,
                url: result.secure_url,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: 'Error uploading video to Cloudinary',
            });
        }
    }


}
export default adminController 