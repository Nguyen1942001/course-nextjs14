// ** MUI Imports
import { useTheme } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const FallbackSpinner = ({ sx }: { sx?: BoxProps['sx'] }) => {
    // ** Hook
    const theme = useTheme();

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
                ...sx,
            }}
        >
            <CircularProgress />
        </Box>
    );
};

export default FallbackSpinner;
