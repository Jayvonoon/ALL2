import axios from 'axios';

export const getPlacesData = async (type,sw,ne) => 
{
    try 
    {
        const {data: {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, 
        {
            params: 
            {
              bl_latitude: sw.lat,
              tr_latitude: ne.lat,
              bl_longitude: sw.lng,
              tr_longitude: ne.lng,
            },
            //Integrate Google Places instead of TravelAdvisor's API
            headers:
            {
              'X-RapidAPI-Key': '1c00ac72bemshe087bc3b8349f17p100ff2jsn1e955937feee',
              'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            } 
        });

        return data;
    } 
    catch (error)
    {
        console.log(error)
    }
}
