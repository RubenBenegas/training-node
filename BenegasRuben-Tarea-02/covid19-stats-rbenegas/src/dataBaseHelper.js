var admin = require("firebase-admin");

var visit = {
  apiName: "ApiRuben",
  apiOwner: "Ruben",
  useCount: 1,
};

var serviceAccount = require("./training-node-db-firebase-adminsdk-rp1w1-39614dadba.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://training-node-db.firebaseio.com",
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();

async function UseApiCounter(){
    db.ref("visits").once("value", (snapshot) => {
        try {
          const data = snapshot.val();
          
          var contiene = false;
          var itemIdUpdate = '';
          var itemUseCount = 0;
          if (!data) {
            db.ref("visits").push(visit);
          } else {
            for (let i in data) {
              const obj = data[i];
    
              if (obj.apiName == visit.apiName) {
                itemIdUpdate = i;
                contiene = true;
                itemUseCount = obj.useCount;
              }
            }
    
            if (!contiene) {
              db.ref("visits").push(visit);
            }else{
              visit.useCount = ++itemUseCount;
              db.ref('visits/' + itemIdUpdate).set(visit);
            }
          }
        } catch (error) {
          console.log(error);
        }
        finally{
          db.goOffline();
        }
      });
}

async function ViewVisits(){
   await db.ref("visits").once("value", (snapshot) => {
      try {
        const data = snapshot.val();
        return data;
      } catch (error) {
        console.log(error);
      }
      finally{
        db.goOffline();
      }
    });
}
module.exports = { UseApiCounter, ViewVisits}