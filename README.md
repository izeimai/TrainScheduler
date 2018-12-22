# TrainScheduler
**Practice using Firebase and Moment.js**

*What does the project do?* 
User can add hypothetical trains with a name, destination, start time for the first train and frequency throughout the day. The train information will be stored in Firebase and also appended in the html after any previously inputted trains. There are two new columns available in the html that show the time of the next train based on the current time and the number of minutes until the next train arrives.

*Why is the project useful?*
I learned how to use the Moment javascript library to calculate time. I found it to be a bit cumbersome with the unintuitive syntax (e.g. "HH:mm" is not the same as "hh:mm"), but the documentation was helpful. This project also used Google's Firebase platform to set up a realtime database to store the train information.

*Follow up work*
If this were a real train schedule, it will need a last train time. If the time is after the last train time, then the next train would be the first train in the following day.