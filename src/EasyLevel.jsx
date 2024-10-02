import React, { useState } from 'react';
import { Button, Card, CardContent, CardMedia, Grid2, Skeleton, Stack, Typography } from '@mui/material';
import axios from 'axios';

const EasyLevel = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchImages = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=5');
            console.log(response.data); // Log the response data
            setImages(response.data);
        } catch (err) {
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    return (


        <div >
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

        </div>
    );
};


export default EasyLevel;


// <>
//     <Button variant="contained" onClick={fetchImages} style={{ marginBottom: '20px' }}>
//         Fetch Images
//     </Button>
//     <div style={{ display:'flex',flexDirection:'row' ,  alignItems: 'center', justifyContent: 'center' , height:'100%' }}>

//         {loading && <Typography>Loading...</Typography>}
//         {error && <Typography>{error}</Typography>}
//         {!loading && images.length === 0 && !error && <Typography>No images available</Typography>}

//         <Grid2 container spacing={3}>
//             {images.map((image, index) => (
//                 <Grid2 item xs={12} key={index}>
//                     <Card style={{ height: '300px', width: '350px' }}>
//                         <CardMedia
//                             component="img"
//                             image={image.url}
//                             alt={`cat-${index}`}
//                             style={{ height: '100%', objectFit: 'cover' }}
//                         />
//                     </Card>
//                 </Grid2>
//             ))}
//         </Grid2>
//     </div>
// </>


{/* <Grid2 container spacing={3}>
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
            </Grid2> */}
