const express = require('express');
const path = require('path');
const app = express();

// dummy comment
app.use((req, res, next) => {
	if (req.header('x-forwarded-proto') !== 'https') {
		res.redirect(`https://${req.header('host')}${req.url}`);
	} else next();
});
app.use(express.static('build'));
app.get('*', function(req, res) {
	res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
