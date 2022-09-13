import React from 'react';
import {Box, Stack} from "@mui/material";
import {ChannelCard, VideoCard} from "./index";

const Videos = ({videos, direction}) => {

    if (!videos?.length) return null;

    return (
        <Stack direction={direction || 'row'} flexWrap={'wrap'} justifyContent={'start'} gap={2}>
            {videos.map((item, indx) => (
                <Box key={indx}>
                    {item.id.videoId && <VideoCard video={item}/>}
                    {item.id.channelId && <ChannelCard channelDetail={item}/>}
                </Box>
            ))}
        </Stack>
    );
};

export default Videos;
