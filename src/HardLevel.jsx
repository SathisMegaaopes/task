// import React, { useState, useEffect, useRef } from 'react';
// import { Card, CardMedia, CircularProgress, Grid2, Skeleton, Typography } from '@mui/material';
// import axios from 'axios';

// const HardLevel = () => {
//     const [images, setImages] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const observer = useRef(null);

//     const error = false;

//     const fetchImages = async (pageNumber = 1) => {
//         setLoading(true);
//         try {
//             const response = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=5&page=${pageNumber}&order=Desc`);
//             if (loading) {
//                 setTimeout(() => {
//                     setImages((prevImages) => [...prevImages, ...response.data]);
//                 }, 3000);
//             } else {
//                 setImages((prevImages) => [...prevImages, ...response.data]);
//             }
//         } catch (err) {
//             console.error('Failed to fetch data', err);
//         } finally {
//             setLoading(false);
//         }
//     };


//     useEffect(() => {

//         fetchImages();

//     }, []);

//     const handleObserver = (entries) => {
//         const target = entries[0];
//         if (target.isIntersecting && !loading) {
//             const nextPage = Math.floor(images.length / 5) + 1;
//             fetchImages(nextPage);
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
//     }, [images]);

//     return (
//         <div>
//             <Grid2 container spacing={2} display='flex' justifyContent="center" alignItems="center" >
//                 {loading ? (
//                     Array.from(new Array(5)).map((_, index) => (
//                         <Grid2 key={index} sx={{ p: 0 }}>
//                             <Skeleton width={'92vw'} height={'400px'} sx={{ marginTop: '-80px' }} />
//                         </Grid2>
//                     ))
//                 ) : error ? (
//                     <Grid2 item>
//                         <Typography color="error">{error}</Typography>
//                     </Grid2>
//                 ) : images.length === 0 ? (
//                     <Grid2 item>
//                         <Typography>No data available.</Typography>
//                     </Grid2>
//                 ) : (
//                     <Grid2 container spacing={3}>
//                         {images.map((image, index) => (
//                             <Grid2 item xs={6} key={index} >
//                                 <Card key={index} style={{ height: '300px', width: '92vw'}}>
//                                     <CardMedia
//                                         component="img"
//                                         image={image.url}
//                                         alt={`cat-${index}`}
//                                         style={{ height: '100%', objectFit: 'cover'  }}
//                                     />
//                                 </Card>
//                             </Grid2>
//                         ))}
//                     </Grid2>
//                 )}
//             </Grid2>

//             {loading && (
//                 <Grid2 container justifyContent="center" alignItems="center" style={{ height: '400px' }}>
//                     <CircularProgress />
//                 </Grid2>
//             )}

//             <div id="scroll-anchor" style={{ height: '1px' }}></div>
//         </div >
//     );
// };

// export default HardLevel;





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






// import React, { useState, useEffect } from 'react';
// import { Card, CardMedia, CircularProgress, Grid2, Skeleton, Typography, Button } from '@mui/material';
// import axios from 'axios';

// const HardLevel = () => {
//     const [images, setImages] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [isLoadingMore, setIsLoadingMore] = useState(false); // Separate loading state for Load More
//     const [hasMore, setHasMore] = useState(true);

//     const fetchImages = async (pageNumber = 1, isLoadMore = false) => {
//         if (isLoadMore) setIsLoadingMore(true);
//         else setLoading(true);

//         try {
//             const response = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=5&page=${pageNumber}&order=Desc`);
//             if (response.data.length > 0) {
//                 setImages((prevImages) => [...prevImages, ...response.data]);
//             } else {
//                 setHasMore(false); // No more images to load
//             }
//         } catch (err) {
//             console.error('Failed to fetch data', err);
//         } finally {
//             if (isLoadMore) setIsLoadingMore(false);
//             else setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchImages(); // Initial fetch
//     }, []);

//     const loadMoreImages = () => {
//         const nextPage = Math.floor(images.length / 5) + 1; // Calculate the next page
//         fetchImages(nextPage, true); // Fetch next page images, set isLoadMore to true
//     };

//     return (
//         <div>
//             <Grid2 container spacing={2} justifyContent="center" alignItems="center">
//                 {loading && (
//                     Array.from(new Array(5)).map((_, index) => (
//                         <Grid2 item xs={12} sm={6} md={4} key={index} sx={{ p: 1 }}>
//                             <Skeleton
//                                 width={'100%'}
//                                 height={'300px'}
//                                 sx={{ marginBottom: '20px' }}
//                             />
//                         </Grid2>
//                     ))
//                 )}

//                 {!loading && images.length === 0 && (
//                     <Grid2 item>
//                         <Typography>No data available.</Typography>
//                     </Grid2>
//                 )}

//                 <Grid2 container spacing={3}>
//                     {images.map((image, index) => (
//                         <Grid2 item xs={12} sm={6} md={4} key={index}>
//                             <Card
//                                 sx={{
//                                     height: '300px',
//                                     width: '100%',
//                                     margin: '10px auto',
//                                     display: 'flex',
//                                     justifyContent: 'center',
//                                     alignItems: 'center'
//                                 }}
//                             >
//                                 <CardMedia
//                                     component="img"
//                                     image={image.url}
//                                     alt={`cat-${index}`}
//                                     sx={{
//                                         height: '100%',
//                                         width: '100%',
//                                         objectFit: 'cover'
//                                     }}
//                                 />
//                             </Card>
//                         </Grid2>
//                     ))}
//                 </Grid2>
//             </Grid2>

//             {/* Load More Button with CircularProgress */}
//             {!loading && hasMore && (
//                 <Grid2 container justifyContent="center" style={{ margin: '20px 0' }}>
//                     {isLoadingMore ? (
//                         <CircularProgress />
//                     ) : (
//                         <Button
//                             variant="contained"
//                             onClick={loadMoreImages}
//                             sx={{
//                                 width: '200px',
//                                 height: '50px',
//                                 fontSize: '1rem'
//                             }}
//                         >
//                             Load More
//                         </Button>
//                     )}
//                 </Grid2>
//             )}

//             {/* Anchor for infinite scroll */}
//             <div id="scroll-anchor" style={{ height: '1px' }}></div>
//         </div>
//     );
// };

// export default HardLevel;








// import React, { useState, useEffect } from 'react';
// import { Card, CardMedia, CircularProgress, Grid2, Skeleton, Typography, Button } from '@mui/material';
// import axios from 'axios';

// const HardLevel = () => {
//     const [images, setImages] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [isLoadingMore, setIsLoadingMore] = useState(false);
//     const [hasMore, setHasMore] = useState(true);

//     const fetchImages = async (pageNumber = 1, isLoadMore = false) => {
//         if (isLoadMore) setIsLoadingMore(true);
//         else setLoading(true);

//         try {
//             const response = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=5&page=${pageNumber}&order=Desc`);
//             if (response.data.length > 0) {
//                 setImages((prevImages) => [...prevImages, ...response.data]);
//             } else {
//                 setHasMore(false);
//             }
//         } catch (err) {
//             console.error('Failed to fetch data', err);
//         } finally {
//             if (isLoadMore) {
//                 setTimeout(() => {
//                     setIsLoadingMore(false);
//                 }, 3000);
//             } else {
//                 setLoading(false);
//             }
//         }
//     };

//     useEffect(() => {
//         fetchImages();
//     }, []);

//     const loadMoreImages = () => {
//         const nextPage = Math.floor(images.length / 5) + 1;
//         fetchImages(nextPage, true);
//     };

//     return (
//         <div>
//             <Grid2 container spacing={2} justifyContent="center" alignItems="center">
//                 {loading && (
//                     Array.from(new Array(5)).map((_, index) => (
//                         <Grid2 item key={index} sx={{ p: 0 }}>
//                             <Skeleton width={'97vw'} height={'400px'} sx={{ marginTop: '-80px' }} />
//                         </Grid2>
//                     ))
//                 )}

//                 {!loading && images.length === 0 && (
//                     <Grid2 item>
//                         <Typography>No data available.</Typography>
//                     </Grid2>
//                 )}

//                 <Grid2 container spacing={3}>
//                     {images.map((image, index) => (
//                         <Grid2 item xs={12} key={index}>
//                             <Card style={{ height: '300px', width: '97vw', margin: '10px auto' }}>
//                                 <CardMedia
//                                     component="img"
//                                     image={image.url}
//                                     alt={`cat-${index}`}
//                                     style={{ height: '100%', objectFit: 'cover' }}
//                                 />
//                             </Card>
//                         </Grid2>
//                     ))}
//                 </Grid2>
//             </Grid2>

//             {!loading && hasMore && (
//                 <Grid2 container justifyContent="center" style={{ margin: '20px 0' }}>
//                     {isLoadingMore ? (
//                         <CircularProgress />
//                     ) : (
//                         <Button variant="contained" onClick={loadMoreImages}>
//                             Load More
//                         </Button>
//                     )}
//                 </Grid2>
//             )}

//             <div id="scroll-anchor" style={{ height: '1px' }}></div>
//         </div>
//     );
// };

// export default HardLevel;



























