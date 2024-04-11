const paginations = async (
    data,
    page = 1,
    PAGE_SIZE = 4,
    isFromDatabase = true,
    includeDeleted = false
) => {
    try {
        if (page < 1) {
            page = 1;
        }

        const skipPage = (page - 1) * PAGE_SIZE;

        if (isFromDatabase) {
            const query = includeDeleted
                ? data.findWithDeleted({ deleted: true })
                : data.find({});

            const [dataObj, total] = await Promise.all([
                query.skip(skipPage).limit(PAGE_SIZE),
                data.countDocuments(),
            ]);

            const totalPage = Math.ceil(total / PAGE_SIZE);
            return { dataObj, totalPage };
        } else {
            const result = data.slice(skipPage, skipPage + PAGE_SIZE);
            const total = data.length;
            const totalPage = Math.ceil(total / PAGE_SIZE);

            return { dataObj: result, totalPage };
        }
    } catch (error) {
        console.log(error);
    }
};

export default paginations;
