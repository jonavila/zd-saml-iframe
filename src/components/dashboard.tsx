import { Box } from '@chakra-ui/core';
import React, { FC } from 'react';
import { getZoomdataUrl } from '../utils';
import zoomdataConfig from '../zoomdata-config.json';

interface DashboardProps {
  id: string;
  mode: 'embedded' | 'native' | 'widget';
}

export const Dashboard: FC<DashboardProps> = (props) => {
  const { id, mode } = props;
  const zoomdataUrl = getZoomdataUrl(zoomdataConfig);
  return (
    <Box
      as="iframe"
      // @ts-ignore
      frameBorder="0"
      src={`${zoomdataUrl}/visualization/${id}?__target=${mode}`}
      overflow="hidden"
      height="100%"
      width="100%"
    />
  );
};
