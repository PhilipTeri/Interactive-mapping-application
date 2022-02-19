# Interactive Mapping and Data Gathering Application

![image](https://user-images.githubusercontent.com/41071502/140565060-7cd59c2a-d7cd-4371-bf56-9b2a21c1c5c6.png)

## Purpose
The purpose of this mapping tool is to gather input from local residents and stakeholders about areas of opportunity and concern for solar farm developments. By clicking on the polygon button below the map legend, you can trace specific parcels of land or general regions that you believe to be suitable or unsuitable for solar farm development. A dialogue box will appear to give you an opportunity to share your thoughts. Detailed instructions about how to provide input to the map are provided below. Your input will be incorporated into a complete map showing the input from all other local residents and stakeholders that have contributed their thoughts.

![image](https://user-images.githubusercontent.com/41071502/140564876-2ec7cd2f-a5c9-4bc0-abe8-f57c8716ca75.png)


## Background

The map on display shows the results of a detailed technical analysis of constraints and factors that influence the suitability of a particular parcel of land to host solar farms. These maps serve as a guide to help us understand where solar farms might be developed in the region based on economic factors and existing regulations. All areas that are not legally accessible for solar farm development - e.g., to protect environmentally sensitive areas - have already been removed from the map. What’s left are areas that are more or less costly due to economic factors, and more or less accessible due to regulatory factors. If you want more information on how this map was generated see our preliminary report here https://www.cekap.ca/PDF/resources-mapping-opportunities-for-renewable-energy-a-guidebook.pdf 


## Technologies Used

The bulk of the application was made using an open source mapping library called Leaflet. The backend is running node.js with Express.js. I made a simple API that send the shapefiles and input data to a postgres database with PostGIS enabled to encode the shapefiles. 


## Interactive Functionality


### Toggling Basemaps and Layers 

![image](https://user-images.githubusercontent.com/41071502/140566561-50fbad5c-104e-4714-97d1-9468c016d964.png)

![image](https://user-images.githubusercontent.com/41071502/140566131-7846fd03-97ce-4d5e-81f8-3c898f01fd1f.png)

### Drawing Polygons
![image](https://user-images.githubusercontent.com/41071502/140569868-3b27fefc-4bed-4629-8745-0edfc2a273bd.png)
