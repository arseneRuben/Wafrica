import { Box, useMediaQuery } from "@mui/material";

import Navbar from "../navbar";


const VideoBlogPage = () => {

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");





  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
      
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
         
        </Box>
      </Box>
    </Box>
  );
};

export default VideoBlogPage;