import Database from "../Database/index.js";

function CourseRoutes(app) {
	// Fetch all courses
	app.get("/api/courses", (req, res) => {
		const courses = Database.courses;
		res.send(courses);
	});
	// Create course
	app.post("/api/courses", (req, res) => {
		const course = { ...req.body, _id: new Date().getTime().toString() };
		Database.courses.push(course);
		res.send(course);
	});
	// Delete course
	app.delete("/api/courses/:id", (req, res) => {
		const { id } = req.params;
		Database.courses = Database.courses.filter((c) => c._id !== id);
		res.sendStatus(204);
	});
	// Update course
	app.put("/api/courses/:id", (req, res) => {
		const { id } = req.params;
		const course = req.body;
		Database.courses = Database.courses.map((c) => (c._id === id ? { ...c, ...course } : c));
		res.sendStatus(204);
	});
}
export default CourseRoutes;
