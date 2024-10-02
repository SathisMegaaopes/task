import React, { useState, useEffect, useRef } from 'react';
import { Card, CardMedia } from '@mui/material';
import axios from 'axios';

const HardLevel = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const observer = useRef(null);

    const fetchImages = async (pageNumber = 1) => {
        setLoading(true);
        try {
            const response = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=5&page=${pageNumber}&order=Desc`);
            if (loading) {
                setTimeout(() => {
                    console.log('This is now working dude....')
                    setImages((prevImages) => [...prevImages, ...response.data]);
                }, 3000);
            } else {
                setImages((prevImages) => [...prevImages, ...response.data]);
            }
        } catch (err) {
            console.error('Failed to fetch data', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleObserver = (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !loading) {
            const nextPage = Math.floor(images.length / 5) + 1; // Calculate next page based on images count
            fetchImages(nextPage);
        }
    };

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '20px',
            threshold: 1.0,
        };
        observer.current = new IntersectionObserver(handleObserver, options);
        const currentObserver = observer.current;
        if (currentObserver) {
            currentObserver.observe(document.querySelector('#scroll-anchor'));
        }
        return () => {
            if (currentObserver) {
                currentObserver.disconnect();
            }
        };
    }, [images]); // Add images as dependency to reinitialize observer

    return (
        <div>
            {images.map((image, index) => (
                <Card key={index} style={{ height: '400px', width: '97vw', margin: '10px auto' }}>
                    <CardMedia
                        component="img"
                        image={image.url}
                        alt={`cat-${index}`}
                        style={{ height: '100%', objectFit: 'cover' }}
                    />
                </Card>
            ))}
            {/* Loading Image Card */}
            {loading && (
                <Card style={{ height: '400px', width: '97vw', margin: '10px auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img
                        src="https://www.google.com/url?sa=i&url=https%3A%2F%2Ftenor.com%2Fview%2Floading-buffering-spinning-waiting-gif-17313179&psig=AOvVaw29tEwi52_cHFy2wqGF4AZh&ust=1727940925861000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCLD_j9uX74gDFQAAAAAdAAAAABAE" // Replace with your loading image URL
                        alt="Loading"
                        style={{ width: '50px', height: '50px' }} // Adjust size as needed
                    />
                </Card>
            )}
            <div id="scroll-anchor" style={{ height: '1px' }}></div>
        </div>
    );
};

export default HardLevel;
































// import React, { useEffect, useRef } from 'react';
// import { Card, CardMedia, Grid2, Typography } from '@mui/material';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';

// const fetchImages = async (page) => {
//     const response = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=5&page=${page}&order=Desc`);
//     return response.data;
// };

// const HardLevel = () => {
//     const [page, setPage] = React.useState(1);
//     const observer = useRef(null);

//     const { data: images, isLoading, isError } = useQuery(['images', page], () => fetchImages(page), {
//         keepPreviousData: true, // Keep previous data while fetching new data
//     });

//     const handleObserver = (entries) => {
//         const target = entries[0];
//         if (target.isIntersecting) {
//             setPage((prevPage) => prevPage + 1);
//         }
//     };

//     useEffect(() => {
//         const options = {
//             root: null,
//             rootMargin: '20px',
//             threshold: 1.0,
//         };
//         observer.current = new IntersectionObserver(handleObserver, options);
//         const currentObserver = observer.current;
//         if (currentObserver) {
//             currentObserver.observe(document.querySelector('#scroll-anchor'));
//         }
//         return () => {
//             if (currentObserver) {
//                 currentObserver.disconnect();
//             }
//         };
//     }, []);

//     return (
//         <div style={{ textAlign: 'center' }}>
//             <Grid2 container spacing={3}>
//                 {images && images.map((image, index) => (
//                     <Grid2 item xs={12} key={index}>
//                         <Card style={{ height: '400px', width: '97vw' }}>
//                             <CardMedia
//                                 component="img"
//                                 image={image.url}
//                                 alt={`cat-${index}`}
//                                 style={{ height: '100%', objectFit: 'cover' }}
//                             />
//                         </Card>
//                     </Grid2>
//                 ))}
//             </Grid2>
//             <div id="scroll-anchor" style={{ height: '1px' }}></div>

//             {isLoading && (
//                 <Typography style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
//                     Loading more images...
//                 </Typography>
//             )}

//             {isError && (
//                 <Typography style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'red' }}>
//                     An error occurred while fetching images.
//                 </Typography>
//             )}
//         </div>
//     );
// };

// export default HardLevel;
