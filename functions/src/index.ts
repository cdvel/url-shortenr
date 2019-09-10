import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions';
admin.initializeApp(functions.config().firebase);
import * as cors from "cors";
import * as express from "express";

const app = express();

app.use(cors({origin: true}));

app.get('/r/:slug', (req, res) => {

		const slug = req.params.slug;
		const doc = admin.firestore().doc(`urls/${slug}`)
		doc.get().then(snapshot => {
			const redir = snapshot.data();
			if (redir == null){	//1. manage 404
				res.status(404).send('Not found');
			}else{
				res.redirect(301, redir.url); //2. redirect
			}
		}).catch(error => {
			res.status(500).send(error)
		})
});

exports.redirect = functions.https.onRequest(app);
