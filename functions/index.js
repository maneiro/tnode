const functions = require("firebase-functions");
var bodyParser = require('body-parser');
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');


var admin = require("firebase-admin");
var serviceAccount = require("./tnode-1a0be-firebase-adminsdk-9waep-7df719d9e4.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const express= require('express');
const PORT=3000;
var bodyParser = require('body-parser');
const app= express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const db = getFirestore();
dbfile='locations';
dbfile2='storage';
const locations_db = db.collection(dbfile);
const storage_db = db.collection(dbfile2);

var ss=[];


app.get('/hello', (req, res, next) => {
    res.send ({mensaje:"Welcome Firebase Alex"});

});

app.post('/allocate', function(req, res) {
    console.log('receiving data ...');
    console.log('body is ',req.body);
    data= req.body;
    // valdata=  FieldValue.arrayUnion(data.barcode);    
    storage_db.add({ location:data.loc,items:data.items});
    // res.send(req.body);    
    res.send({data:data});
});

app.post('/pickup', function(req, res) {
    console.log('receiving data ...');
    console.log('body is ',req.body);
    data= req.body;
    val=storage_db.where('location', '==',
  "sk2");
    // res.send(req.body);    
    res.send({data:val});
});


app.listen (PORT, ()=>{
    console.log('Server is running on PORT ',PORT);
});


 locations_db.get().then(
            (x) => { x.forEach ( (xx) => { const id=xx.id;
                                    const data=xx.data();
                                    ss.push({id, ...data})
                                     } 
                     )
            console.log("db: ",ss,ss.length);

});




exports.app = functions.https.onRequest(app);
