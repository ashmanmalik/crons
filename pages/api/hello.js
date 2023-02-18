// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
 
  var token = 'token';

DestroyBulkUsersandtheirLifes(token);

   function DestroyBulkUsersandtheirLifes(token) {
     fetch("https://au-api.basiq.io/users", {
         headers: { 
             'Authorization': `Bearer ${token}`, 
             'Accept': 'application/json'
           }
     })
     .then(res => res.json())
     .then((res) => {
         console.log(res)
         res.data.forEach((user) => {
            // Fetch User Created date 1 week ago ... 
            var strDate = user.createdTime;
            var isoAPIdate = new Date(strDate).toISOString();
            // Gets 1 Week Old Date... 
            const current = new Date();
            //current.setDate(current.getDate() - 7);
            // For 1 Month Old date .. 
            current.setMonth(current.getMonth()-1)
            // Checks How many users are there in past 7 days
            
            if ( isoAPIdate < current.toISOString()) {
                
                console.log(isoAPIdate);
                console.log(user.links.self);
                fetch(`${user.links.self}`, {
                 method: 'DELETE',
                 headers: { 
                     'Authorization': `Bearer ${token}`, 
                     'Accept': 'application/json'
                   }
                 })
            } 
            
         })
     })
     .then(console.log("done"));
 }


}
