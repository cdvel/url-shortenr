import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions';
admin.initializeApp(functions.config().firebase);
import * as cors from "cors";
import * as express from "express";

const app = express();

app.use(cors({origin: true}));

app.post('/', (req, res) => {

		const url = req.body.data;
		const slug = Math.random().toString(36).substr(2,5).toUpperCase();
		res.set('Access-Control-Allow-Origin', '*');

		admin.firestore().doc(`urls/${slug}`).set({url: url})
		.then(snapshot => {
			return res.send({data:slug});
		}).catch(error => {
			res.status(500).send(error);
		})
		
});

app.get('/:slug', (req, res) => {

		const slug = req.params.slug;
		const doc = admin.firestore().doc(`urls/${slug}`)
		doc.get().then(snapshot => {
			const redir = snapshot.data();

			recordAnalytics(slug, req.headers);

			if (redir == null){
				res.redirect(301, '/home');
			}else{
				res.redirect(302, encodeURI(redir.url.trim()));
			}
		}).catch(error => {
			res.redirect(301, '/home');
		})
});

function recordAnalytics(slug: string, headers: any){

	const timestamp = Date.now().toString();
	const payload = {
		'slug': slug,
		'lang': headers['accept-language'] || null,
		'user-agent': headers['user-agent'] || null,
		'ip': headers['fastly-client-ip'] || null
	};
	admin.firestore().doc(`clicks/${timestamp}`).set(payload).then(snp =>{return null;}).catch(error =>{return null;});
};

exports.getConfig = function(){

	return functions.config().firebase; 
}

exports.sendNotifications = functions.firestore.document('clicks/{click_id}').onCreate(


	async (snapshot) => {

		console.log('notifications pipeline started');
		// const text = snapshot.data().text;

		let ip_val = 'unknown';
		let slug_val = 'none';
		const data_val = snapshot.data();

		if (data_val){
			ip_val = data_val.ip;
			slug_val = data_val.slug;
		}
		const payload = {
			notification: {
				title: `${ip_val} clicked ${slug_val}`,
				body: `${ip_val} clicked ${slug_val}`, 
				// icon: snapshot.data().profilePicUrl || 'images/profile_placeholder.png',
				// click_action: `https://${process.env.GCLOUD_PROJECT}.firebaseapp.com`,
			}
		}
		//device tokens
		const allTokens = await admin.firestore().collection('fcmTokens').get();
		const tokens = Array();
		allTokens.forEach((tokenDoc) => {
			let id = tokenDoc.id.split(':')[1];
			tokenDoc.id
			console.log('target: ', tokenDoc.id);

			console.log('sending to: ', id);
			tokens.push(id);
		});

		if(tokens.length > 0){
			const response = await admin.messaging().sendToDevice(tokens, payload);
			// await cleanupTokens(response, tokens);
			console.log('notifications have been sent and tokens cleaned up.', response.results);
			return response;
		}

		return null;

	});


exports.shorten = functions.https.onRequest(app);


