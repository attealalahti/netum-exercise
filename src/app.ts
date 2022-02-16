import express from "express";
import people from "./routes/people";
const app = express();
const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
    console.log(`Listening on port ${(server.address() as any).port}`);
});

app.use(express.json());
app.use("/people", people);
