import axios from 'axios';

const API_KEY = 'AIzaSyBJORpE6BU7lQ5ffLjNTtCPAPNylSAsNmg';

export const getPlacesData = async (type, sw, ne) => 
{
  try 
  {
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${API_KEY}`,
      {
        params: {
          location: `${sw.lat},${sw.lng}`,
          radius: 1500, // Adjust the radius as needed
          type: type, // e.g., 'restaurant', 'hotel', etc.
        },
      });

    return data;
  } 
  catch (error) 
  {
    console.error(error);
    throw error; // Rethrow the error to handle it in the calling code
  }
};