import app from "./api-gateway.js";
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`server listening on ${PORT}`);
});
