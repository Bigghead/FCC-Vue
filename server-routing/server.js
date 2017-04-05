const express = require('express');
const path = require('path');
const app = express();


//app.use(path.join(__dirname, './dist/index.html'));
app.get('/testing', (req, res) => {
  res.send([
	{
		color: "red",
		value: "#f00"
	},
	{
		color: "green",
		value: "#0f0"
	},
	{
		color: "blue",
		value: "#00f"
	},
	{
		color: "cyan",
		value: "#0ff"
	},
	{
		color: "magenta",
		value: "#f0f"
	},
	{
		color: "yellow",
		value: "#ff0"
	},
	{
		color: "black",
		value: "#000"
	}
]);
});

app.get('*', (req, res) => {
  //res.render('index');
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8000);
