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

exports.shorten = functions.https.onRequest(app);


