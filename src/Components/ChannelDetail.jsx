import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {fetchFromAPI} from "../utils/FetchFromAPI";
import {Box} from "@mui/material";
import {ChannelCard, Videos} from "./index";

const ChannelDetail = () => {

    const [channelDetail, setChannelDetail] = useState(null);
    const [videos, setVideos] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) => setChannelDetail(data?.items[0]));

        fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then((data) => setVideos(data?.items));
    }, [id])

    return (
        <Box minHeight={'95vh'}>
            <Box>
                <div style={{
                    height: '300px',
                    background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 25%, rgba(7,144,30,1) ' +
                        '56%, rgba(0,212,255,1) 100%)',
                    zIndex: 10,
                }}
                />
                <ChannelCard channelDetail={channelDetail} marginTop={'-110px'}/>
            </Box>

            <Box display={'flex'} p={'2'}>
                <Box sx={{mr: {sm: '100px'}}}/>
                    <Videos videos={videos}/>
            </Box>

        </Box>
    );
};

export default ChannelDetail;
