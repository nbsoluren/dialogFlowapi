router.post('/addnewfaculty', async (req, res) => {
    try {
        const preResult = await Promise.all([Faculty.addNewFaculty(req.body)]);
        const result = await Faculty.getFacultyById(preResult);
        const data = {
            status: 200,
            message: "Successfully added user.",
            items: result
        };
        res.status(data.status).json(data)
    }
    catch (err) {
        res.status(err.status).json(err)
    }
});