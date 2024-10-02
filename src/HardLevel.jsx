import React, { useState, useEffect, useRef } from 'react';
import { Card, CardMedia, CircularProgress, Grid2, Skeleton, Typography, Button } from '@mui/material';
import axios from 'axios';

const HardLevel = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const fetchImages = async (pageNumber = 1, isLoadMore = false) => {
        if (isLoadMore) setIsLoadingMore(true);
        else setLoading(true);

        try {
            const response = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=5&page=${pageNumber}&order=Desc`);
            if (response.data.length > 0) {
                setImages((prevImages) => [...prevImages, ...response.data]);
            } else {
                setHasMore(false);
            }
        } catch (err) {
            console.error('Failed to fetch data', err);
        } finally {
            if (isLoadMore) setIsLoadingMore(false);
            else setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const loadMoreImages = () => {
        const nextPage = Math.floor(images.length / 5) + 1;
        fetchImages(nextPage, true);
    };

    return (
        <div>
            <Grid2 container spacing={2} justifyContent="center" alignItems="center">
                {loading && (
                    Array.from(new Array(5)).map((_, index) => (
                        <Grid2 key={index} sx={{ p: 0 }}>
                            <Skeleton width={'92vw'} height={'400px'} sx={{ marginTop: '-80px' }} />
                        </Grid2>
                    ))
                )}



                {!loading && images.length === 0 && (
                    <Grid2 item>
                        <Typography>No data available.</Typography>
                    </Grid2>
                )}

                {images.map((image, index) => (
                    <Grid2 item xs={6} key={index} >
                        <Card key={index} style={{ height: '300px', width: '92vw' }}>
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

            {
                !loading && hasMore &&  images.length !== 0 && (
                    <Grid2 container justifyContent="center" style={{ margin: '20px 0' }}>
                        {isLoadingMore ? (
                            <CircularProgress />
                        ) : (
                            <Button
                                variant="contained"
                                onClick={loadMoreImages}
                                sx={{
                                    width: '200px',
                                    height: '50px',
                                    fontSize: '1rem'
                                }}
                            >
                                Load More
                            </Button>
                        )}
                    </Grid2>
                )
            }

            <div id="scroll-anchor" style={{ height: '1px' }}></div>
        </div >
    );
};

export default HardLevel;





























