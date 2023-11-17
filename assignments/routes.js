import Database from "../Database/index.js";

function AssignmentRoutes(app) {
    // Fetch all assignments
    app.get("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const assignments = Database.assignments.filter((a) => a.course === cid);
        res.send(assignments);
    });
    // Create assignment
    app.post("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const newAssignment = {
            ...req.body,
            course: cid,
            _id: new Date().getTime().toString(),
        };
        Database.assignments.push(newAssignment);
        res.send(newAssignment);
    });
    // Delete assignment
    app.delete("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        Database.assignments = Database.assignments.filter((a) => a._id !== aid);
        res.sendStatus(200);
    });
    // Update assignment
    app.put("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const assignmentIndex = Database.assignments.findIndex((a) => a._id === aid);
        Database.assignments[assignmentIndex] = {
            ...Database.assignments[assignmentIndex],
            ...req.body,
        };
        res.sendStatus(204);
    });

}
export default AssignmentRoutes;
