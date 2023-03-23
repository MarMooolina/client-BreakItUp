import "./HomePage.css";
import * as React from 'react';
import { Grid, Typography, Button, ImageListItem, ImageList,Box, AppBar } from "@mui/material";
import { Navbar } from "../../components";

function HomePage() {
  return (
    <>
    <Navbar/>

    <Grid container spacing={2} columns={16}>
    
    <Grid xs={8}>
    <Box sx={{ width: 850, height: 300}}>
      <ImageList variant="masonry" cols={2} gap={8}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
    </Grid>

    <Grid xs={8}>
      <Box sx={{ width: '100%', maxWidth: 800 }}>
        <div className="Typography">
        <Typography variant="h1">
          Take a break and boost your health!
        </Typography>
        <div className="Button">
        <Button sx={{color: "#FFFFF", backgroundColor: "#8d6e63"}} variant="contained" href="/signup" size="large" className="ButtonColor">Get Started!</Button>
        </div>
        </div>
      </Box>
    </Grid>

  </Grid>
  </>
  );
}

const itemData = [
  {
    img: 'https://images.pexels.com/photos/4498220/pexels-photo-4498220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Meditate',
  },
  {
    img: 'https://images.pexels.com/photos/6303797/pexels-photo-6303797.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Relax',
  },
  {
    img: 'https://images.unsplash.com/photo-1571510811967-ad6b78c86ffe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=858&q=80',
    title: 'Relax',
  },
  {
    img: 'https://images.unsplash.com/photo-1475938083343-9bb3bf8a4adb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80',
    title: 'Meditate',
  },
];

export default HomePage
