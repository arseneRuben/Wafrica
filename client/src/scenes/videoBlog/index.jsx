import { Box, useMediaQuery , Container, AppBar, Typography, Grow, Grid } from "@mui/material";
import Form from "../../components/Form/Form";
import Posts from "../../components/Posts/Posts";
import { Provider } from "react-redux";
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from "redux-thunk";
import Navbar from "../navbar";
import reducers from '../../reducers';

const store = createStore(reducers, compose(applyMiddleware(thunk)))

const VideoBlogPage = () => {

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");





  return (
    <Provider store={store}>
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
         <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing="3">
             <Grid item xs={12} sm={7}>
                <Posts/>
             </Grid>
             <Grid item xs={12} sm={3}>
                <Form/>
              </Grid>
          </Grid>
         </Container>
        </Box>
      </Box>
    </Box>
    </Provider>
  );
};

export default VideoBlogPage;