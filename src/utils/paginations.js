const paginations = async (
    models,
    page,
    PAGE_SIZE = 4,
    includeDeleted = false
) => {
    try {
        if (page < 1) {
            page = 1;
        }

        const skipPage = (page - 1) * PAGE_SIZE;

        const query = includeDeleted
            ? models.findWithDeleted({ deleted: true })
            : models.find({});

        // const [data, total] = await Promise.all([
        //     query.skip(skipPage).limit(PAGE_SIZE),
        //     models.countDocumentsWithDeleted(
        //         includeDeleted ? { deleted: true } : { deleted: { $ne: true } }
        //     ),
        // ]);

        const [data, total] = await Promise.all([
            query.skip(skipPage).limit(PAGE_SIZE),
            models.countDocuments(),
        ]);

        const totalPage = Math.ceil(total / PAGE_SIZE);
        return { data, totalPage };
    } catch (error) {
        console.log(error);
    }
};

export default paginations;
