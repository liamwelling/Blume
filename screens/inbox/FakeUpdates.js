
import headshotImport from '../../assets/Headshots/headshotImport'
const fakeInboxUpdates = [
  {
    "name" : "Simon Lawrence",
    "photo": require('../../assets/Headshots/Simon_Lawrence.jpg'),
    "notifications" : [
     
      {  
       "id" : 1,
        "message" : "Invested in Tesla",
        "time" : "Today 9:30 AM",
        "unread" : true
      },
      {
       "id" : 2,
       "message" : "Added Apple to portfolio",
       "time" : "3 days ago",
       "unread" : true
     }
    ]
   },
   {
     "name" : "Dylan Welch",
     "photo" : require('../../assets/Headshots/Dylan_Welch.jpg'),
     "notifications" : [
       { 
         "id" : 3,
         "message" : "Invested in Apple",
         "time" : "Today 10:30 AM",
         "unread" : true
       },
       {
         "id" : 4,
        "message" : "Added Ford to portfolio",
        "time" : "2 days ago",
        "unread" : true
      }
     ]
    },
    {
     "name" : "Betty Murphy",
     "photo" : require('../../assets/Headshots/Betty_Murphy.jpg'),
     "notifications" : [
       {
         "id" : 5,
         "message" : "Invested in Tesla",
         "time" : "Today 9:30 AM",
         "unread" : true
       },
     
     ]
    },
    {
     "name" : "James Gill",
     "photo" : require('../../assets/Headshots/James_Gill.jpg'),
     "notifications" : [
       {
         "id" : 6,
         "message" : "Invested in Google",
         "time" : "Today 10:00 AM",
         "unread" : true
       },
       {
       "id" : 7,
        "message" : "Added Tesla to portfolio",
        "time" : "1 day ago",
        "unread" : true
      }
     ]
    },
]
export default fakeInboxUpdates
