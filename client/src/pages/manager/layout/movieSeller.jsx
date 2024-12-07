import React, { useEffect, useState } from 'react';
import { Table, Button, Input, message, Flex } from 'antd';
import MovieController from '@/services/movie/Movie.controller';

const GetIdMovie = () => {
    const [searchTerm, setSearchTerm] = useState(''); // State for search input
    const [filteredMovies, setFilteredMovies] = useState([]);

    const handleCopyId = (movieId) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(movieId)
                .then(() => {
                    message.success('Movie ID copied to clipboard!');
                })
                .catch((error) => {
                    console.error('Clipboard copy failed:', error);
                    message.error('Failed to copy Movie ID');
                });
        } else {
            try {
                const textArea = document.createElement('textarea');
                textArea.value = movieId;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);

                message.success('Movie ID copied to clipboard (fallback method)');
            } catch (error) {
                console.error('Fallback copy failed:', error);
                message.error('Failed to copy Movie ID');
            }
        }
    };

    // Function to handle the search input change
    const handleSearch = (event) => {
        const search = event.target.value;
        setSearchTerm(search);

        // Filter the movie data based on the search term (case-insensitive)
        const filteredData = filteredMovies.filter((movie) =>
            movie.title.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredMovies(filteredData);
    };

    const handleSubmit = async () => {
        try {
            const response = await MovieController.searchMovie(searchTerm);
            if (response && response.data) {
                setFilteredMovies(response.data);
            } else {
                message.error('No movies found.');
            }
        } catch (error) {
            console.error('Error fetching movie data:', error);
            message.error('Failed to fetch movie data.');
        }
    };

    // Columns for the Table display
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Poster',
            dataIndex: 'poster',
            key: 'poster',
            render: (text) => <img src={text} alt="Movie Poster" width={100} />,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Button onClick={() => handleCopyId(record._id)}>Copy ID</Button>
            ),
        },
    ];

    return (
        <div className='sm:w-full flex flex-col'>
            <div className='flex gap-2 p-10'>
                <Input

                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search by movie title"
                    className=' sm:w-full mb-4 flex items-center justify-center '
                // style={{ width: '100%', marginBottom: 20 , display: 'flex', alignItems : 'center' , justifyContent : 'center'  }}
                />
                <Button onClick={handleSubmit} type="primary">
                    Search Movies
                </Button>
            </div>

            <Table
                className='px-10'
                columns={columns}
                dataSource={filteredMovies}
                rowKey="_id"
                style={{ marginTop: 20 }}
            />
        </div>
    );
};

export default GetIdMovie;
