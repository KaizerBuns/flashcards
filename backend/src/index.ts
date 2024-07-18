import express from 'express';
import dotenv from 'dotenv';
import { getXataClient } from './xata';

import { sets, cardsCapitals, cardsProgramming } from './seed-data';
dotenv.config();

const { PORT } = process.env || 3000;
const app = express();

const dbClient = getXataClient();

//increase file upload limit size
app.use(express.json({ limit: '50mb' }));

app.get('/seeddata', async (req, res) => {
	//use xata codegen to generate tables
	try {
		await dbClient.db.sets.create(sets);
		await dbClient.db.cards.create(cardsCapitals);
		await dbClient.db.cards.create(cardsProgramming);
		return res.json({ results: 'OK' });
	} catch {
		return res.json({ results: 'Database already seeded' });
	}
});

app.get('/sets', async (req, res) => {
	//use xata codegen to generate tables
	const results = await dbClient.db.sets
		.select(['id', 'title', 'description', 'image', 'cards'])
		.filter({ private: false })
		.getAll();
	return res.json(results);
});

app.post('/sets/create', async (req, res) => {
	const { title, description, private: isPrivate, image, creator } = req.body;
	console.log(req.body);
	const results = await dbClient.db.sets.create({
		title,
		description,
		private: isPrivate,
		creator,
		image: image
			? { base64Content: image, mediaType: 'image/png', enablePublicUrl: true }
			: null,
	});
	return res.json(results);
});

app.get('/sets/:id', async (req, res) => {
	const { id } = req.params;
	//use xata codegen to generate tables
	//const results = await dbClient.db.sets.select(['id', 'title', 'description', 'image', 'cards']).filter({ id }).getAll();
	const results = await dbClient.db.sets.read(id);
	return res.json(results);
});

app.delete('/sets/:id', async (req, res) => {
	const { id } = req.params;

	//find existing sets being used
	const existingSets = await dbClient.db.user_sets.filter({ set: id }).getAll();
	const existingCards = await dbClient.db.cards.filter({ set: id }).getAll();
	if (existingSets.length > 0) {
		existingSets.forEach(async (set) => {
			await dbClient.db.user_sets.delete(set.id);
		});
	}

	if (existingCards.length > 0) {
		existingCards.forEach(async (card) => {
			await dbClient.db.cards.delete(card.id);
		});
	}

	await dbClient.db.sets.delete(id);
	return res.json({ success: true });
});

app.post('/usersets/create', async (req, res) => {
	const { user, set } = req.body;
	console.log(req.body);
	const results = await dbClient.db.user_sets.create({
		user,
		set,
	});
	return res.json(results);
});

app.get('/usersets', async (req, res) => {
	const { user } = req.query;
	const results = await dbClient.db.user_sets
		.select(['id', 'set.*'])
		.filter({ user: `${user}` })
		.getAll();
	return res.json(results);
});

app.post('/cards/create', async (req, res) => {
	const { set, question, answer } = req.body;
	console.log(req.body);
	const results = await dbClient.db.cards.create({
		set,
		question,
		answer,
	});

	if (results) {
		await dbClient.db.sets.update(set, {
			cards: {
				$increment: 1,
			},
		});
	}

	return res.json(results);
});

app.get('/cards', async (req, res) => {
	const { setId } = req.query;
	//use xata codegen to generate tables
	const results = await dbClient.db.cards
		.select(['*', 'set.*'])
		.filter({ set: setId })
		.getAll();
	return res.json(results);
});

app.get('/cards/learn', async (req, res) => {
	const { setId, limit } = req.query;
	const cards = await dbClient.db.cards
		.select(['question', 'answer', 'image'])
		.filter({ set: setId })
		.getAll();

	const randomCards = cards
		.map((element) => ({ element, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ element }) => element)
		.slice(0, +limit!);

	return res.json(randomCards);
});

app.post('/learnings/create', async (req, res) => {
	const { user, set, cardsTotal, correct, wrong } = req.body;

	const obj = {
		user,
		set,
		cards_total: +cardsTotal,
		cards_correct: +correct,
		cards_wrong: +wrong,
		score: (+correct / +cardsTotal) * 100, //percentage
	};

	const learning = await dbClient.db.learnings.create(obj);
	return res.json(learning);
});

app.get('/learnings', async (req, res) => {
	const { user } = req.query;

	const learnings = await dbClient.db.learnings
		.select(['*', 'set.*'])
		.filter({ user: `${user}` })
		.getAll();
	return res.json(learnings);
});

app.listen(PORT, () => {
	console.log(`APP Listening on port ${PORT}`);
});
