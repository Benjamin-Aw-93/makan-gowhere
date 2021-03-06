import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';
import useStyles from '../css/PlaceDetailstyles';

/*
Component that is found within the listing page, used to display the details of the resturant
The components used wthin the placedetails are mostly to display text and are pretty self explainatory. 
*/

const PlaceDetails = ({ place, selected, refProp }) => {
  const classes = useStyles();

  if (selected) refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" })


  return (
    <Card elevation = {6}>
      <CardMedia //Image of the palce, if available, if not use default photo. 
        style = {{ height: 350 }}
        image = { place.photo ? place.photo.images.large.url : 'https://uhcl-ir.tdl.org/bitstream/handle/10657.1/1573/not-available.jpg.jpg?sequence=1&isAllowed=y'} 
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant = "h5">{ place.name ? place.name : 'Advertiser Space' }</Typography>
        <Box display = 'flex' justifyContent = 'space-between'>
          <Rating name="read-only" size="small" value={Number(place.rating)} readOnly /> 
          <Typography gutterBottom variant = "subtitle1"> out of { place.num_reviews } reviews</Typography>
        </Box>
        <Box display = 'flex' justifyContent = 'space-between'>
          <Typography variant = "subtitle1"> Price </Typography>
          <Typography gutterBottom variant = "subtitle1">{ place.price_level }</Typography>
        </Box>
        <Box display = 'flex' justifyContent = 'space-between'>
          <Typography variant = "subtitle1"> Ranking </Typography>
          <Typography gutterBottom variant = "subtitle1">{ place.ranking }</Typography>
        </Box>
        {place?.awards?.map((award) => (  // Different awards of the restaurant, displayed as text
          <Box display="flex" justifyContent="space-between" my={1} alignItems="center">
            <img src={award.images.small} />
            <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
          </Box>
        ))}
        {place?.cuisine?.map(({ name }) => ( // Different cuisine of the restaurant, displayed as chips
          <Chip key={name} size="small" label={name} className={classes.chip} />
        ))}
        {place?.address && ( // This helps open up google map to the exact location of the resturant, helping the user navigate to the palce if necessary
          <Typography gutterBottom variant="body2" color="textSecondary" className={classes.subtitle}>
            <LocationOnIcon /> <Button size="small" style={{textAlign: 'right', color:"#6a59b5"}} onClick={() => window.open("https://www.google.com/maps/search/".concat(place.address))}>{place.address}</Button>
          </Typography>
        )}
        {place?.phone && (
          <Typography variant="body2" color="textSecondary" className={classes.spacing}>
            <PhoneIcon /> {place.phone}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
          Trip Advisor
        </Button>
        <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
          Website
        </Button>
      </CardActions>
    </Card>
  );
};

export default PlaceDetails;