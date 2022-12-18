// Youtube API key = AIzaSyAzUeU1l9kfi_cmo02t1BRM8waNw8xMQcE

// JavaScript for the extension's popup window

// Load the YouTube API client library
import { search } from "youtube-api";

// Set the API key for the YouTube API
const API_KEY = "AIzaSyAzUeU1l9kfi_cmo02t1BRM8waNw8xMQcE";

// Add an event listener for the search button's click event
document.getElementById("search-button").addEventListener("click", () => {
  // Get the value of the input field
  const channelName = document.getElementById("channel-name").value;

  // Call the searchYoutuber function and pass the channel name as an argument
  searchYoutuber(channelName);
});

// Define the searchYoutuber function
function searchYoutuber(channelName) {
  // Use the YouTube API client library to search for YouTube channels matching the provided name
  search.list(
    {
      part: "id,snippet",
      type: "channel",
      q: channelName,
      key: API_KEY,
    },
    (err, results) => {
      if (err) {
        console.log(err);
        return;
      }

      // If no channels were found, display a message
      if (results.items.length === 0) {
        const message = document.createElement("p");
        message.innerText = "Sorry, could not find a channel with this name";
        document.getElementById("results").appendChild(message);
      } else {
        // Store the search results in the extension's local storage
        chrome.storage.local.set(
          {
            channels: results.items,
          },
          () => {
            console.log("Search results stored in local storage");
          }
        );
      }
    }
  );
}
