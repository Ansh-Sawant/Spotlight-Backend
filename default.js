import fetch from "node-fetch";
import News from "./modal/news.js";

const DefaultData = async (category) => {
  try {
      const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=1e212ce6230442a4ac98f2bacbab76b2`;
      const response = await fetch(url);
      const apiData = await response.json();
  
      await News.deleteMany({});
      await News.insertMany(apiData.articles);
  
      // console.log(apiData.articles);
      console.log("Data Imported successfully");
    
  } catch (error) {
    console.log("Error " + error.message);
  }
};

export default DefaultData;
