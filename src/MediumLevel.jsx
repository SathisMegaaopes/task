import React, { useState } from 'react';
import { Button, Card, CardMedia, Typography, Grid2, Skeleton } from '@mui/material';
import axios from 'axios';

const MediumLevel = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);

    const fetchImages = async (pageNumber = 1) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=5&page=${pageNumber}&order=Desc`); // Cat API with pagination
            setImages(response.data);
        } catch (err) {
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
        fetchImages(page + 1);
    };

    const handlePreviousPage = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 1));
        fetchImages(page - 1);
    };

    return (
        <div>
            <Grid2 container justifyContent="center" style={{ marginBottom: '20px' }}>
                <Grid2 item>
                    <Button variant="contained" onClick={fetchImages}>
                        Fetch Images
                    </Button>
                </Grid2>
            </Grid2>

            <Grid2 container spacing={2} justifyContent="center" alignItems="center" >
                {loading ? (
                    Array.from(new Array(5)).map((_, index) => (
                        <Grid2 key={index} sx={{ p: 0 }}>
                            <Skeleton width={'350px'} height={'500px'} sx={{ marginTop: '-100px' }} />
                            <Skeleton width={'350px'} height={'500px'} sx={{ marginTop: '-150px' }} />
                        </Grid2>
                    ))
                ) : error ? (
                    <Grid2 item>
                        <Typography color="error">{error}</Typography>
                    </Grid2>
                ) : images.length === 0 ? (
                    <Grid2 item>
                        <Typography>No data available.</Typography>
                    </Grid2>
                ) : (
                    <Grid2 container spacing={3}>
                        {images.map((image, index) => (
                            <Grid2 item xs={12} key={index}>
                                <Card style={{ height: '300px', width: '350px' }}>
                                    <CardMedia
                                        component="img"
                                        image={image.url}
                                        alt={`cat-${index}`}
                                        style={{ height: '100%', objectFit: 'cover' }}
                                    />
                                </Card>
                            </Grid2>
                        ))}
                    </Grid2>
                )}
            </Grid2>

            {images.length !== 0 &&
                <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', paddingRight: '30px' }}>
                    <Button variant="contained" onClick={handlePreviousPage} disabled={page === 1}>
                        Previous
                    </Button>
                    <Typography>
                        {page}
                    </Typography>
                    <Button variant="contained" onClick={handleNextPage} style={{ marginLeft: '10px' }}>
                        Next
                    </Button>
                </div>}
        </div>
    );
};

export default MediumLevel;
