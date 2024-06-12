import { Box, BoxProps } from '@mui/material';
import React from 'react';

/**
 * Main container that will set the gutter responsively
 *
 * Max HD resolution only.. After that the width will be restricted to HD... Same applies for zoom out case also
 */
const ResponsiveContainer = ({ sx, ...rest }: BoxProps) => {
  return <Box
    sx={{ px: { lg: 2, xs: 3 }, maxWidth: '1920px', margin: '0 auto', ...sx }}
    {...rest}
         />;
};

export default React.memo(ResponsiveContainer);
