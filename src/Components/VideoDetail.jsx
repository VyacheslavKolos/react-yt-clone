import React, {useEffect, useState} from 'react';

import ReactPlayer from "react-player";
import {Box, Stack, Typography} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import {fetchFromAPI} from "../utils/FetchFromAPI";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {Videos} from "./index";

const VideoDetail = () => {
    const {id} = useParams();

    const [videoDetail, setVideoDetail] = useState(null);
    const [relatedVideos, setRelatedVideos] = useState(null);

    useEffect(() => {
        fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) => setVideoDetail(data.items[0]));

        fetchFromAPI(`search?part=snippet&relatedToVideo=${id}&type=video`).then((data) => setRelatedVideos(data.items));

    }, [id])


    if (!videoDetail) return null
    const {snippet: {title, channelId, channelTitle}, statistics: {viewCount, likeCount}} = videoDetail;


    return (
        <Box minHeight={'95vh'}>
            <Stack direction={{xs: 'column', md: 'row'}}>
                <Box flex={1}>
                    <Box sx={{width: '100%', position: 'sticky', top: '86px'}}>
                        <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className={'react-player'} controls/>
                        <Typography color={'#FFF'} variant={'h5'} fontWeight={'bold'} p={2}>
                            {title}
                        </Typography>
                        <Stack direction={'row'} justifyContent={'space-between'} sx={{color: "#fff"}} py={1} px={2}>
                            <Link to={`/channel/${channelId}`}>
                                <Typography variant={'h6'} color="#fff">
                                    {channelTitle}
                                    <CheckCircleIcon sx={{fontSize: "12px", color: "gray", ml: "5px"}}/>
                                </Typography>
                            </Link>
                            <Stack direction={'row'} gap={'20px'} alignItems={'center'}>
                                <Typography variant={'body1'} sx={{opacity: 0.7}}>
                                    {parseInt(viewCount).toLocaleString()} views
                                </Typography>
                                <Typography variant={'body1'} sx={{opacity: 0.7}}>
                                    {parseInt(likeCount).toLocaleString()} likes
                                </Typography>
                            </Stack>
                        </Stack>
                    </Box>
                </Box>
                <Box px={2} py={{md: 1, xs: 5}} justifyContent={'center'} alignItems={'center'}>
                    <Videos videos={relatedVideos} direction={'column'}/>
                </Box>
            </Stack>
        </Box>
    );
};

export default VideoDetail;
