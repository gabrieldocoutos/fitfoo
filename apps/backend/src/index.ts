import Fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();
const app = Fastify({ logger: true });
const prisma = new PrismaClient();

app.register(cors);

app.get("/api/users", async (request, reply) => {
	const users = await prisma.user.findMany();
	reply.send(users);
});

app.post("/api/users", async (request, reply) => {
	const { name, email } = request.body as { name: string; email: string };
	const user = await prisma.user.create({ data: { name, email } });
	reply.send(user);
});

app.get("/hellow-world", async (request, reply) => {
	reply.send({ hello: "world" });
});

const port = parseInt(process.env.PORT || "3001", 10);
app.listen({ port, host: "0.0.0.0" }, (err, address) => {
	if (err) {
		app.log.error(err);
		process.exit(1);
	}
	app.log.info(`Server listening at ${address}`);
});
