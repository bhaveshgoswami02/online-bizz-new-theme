import * as functions from 'firebase-functions';
//import * as admin from 'firebase-admin';
import * as Razorpay from 'razorpay';
//import * as cors from 'cors';
//admin.initializeApp(functions.config().firebase);
//const db=admin.firestore()
//const corsHandler = cors({ origin: true });
const universal = require(`${process.cwd()}/dist/digitalCard/server/main`).app();


/* export const ssr = functions.https.onRequest(universal); */

export const ssr = functions.https.onRequest(universal);



export const createOrderId = functions.https.onRequest((request, response) => {
    //response.set('Access-Control-Allow-Origin', "*")
    //response.set('Access-Control-Allow-Methods', 'GET, POST')
    response.header('Content-Type','application/json');
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Content-Type');
    //response.send({hello:"hello"})
    //corsHandler(request, response, () => {
        const instance = new Razorpay({
            key_id: request.query.razorpay_key_id,
            key_secret:request.query.razorpay_key_secret
        })
        const options = {
            amount: request.query.amount,
            currency: "INR",
            receipt: "order_receipt",
            payment_capture: true
        };
        instance.orders.create(options).then((res: any) => {
            response.send(res);
        }).catch((err: any) => {                
            response.send(err);
        })      
    //});
});





/* exports.helloWorld = functions.https.onRequest(async (req, res) => {
    const users = await db.collection("users").get()
    console.log(users.docs[0].id)
    res.status(200).send(users.docs[0].id);
}); */
