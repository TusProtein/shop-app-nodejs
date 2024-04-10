const sortable = (models, sort, type) => {
    let objectSort = {};
    objectSort[sort] = type;
    console.log(objectSort);
    const productSort = models.find().sort(objectSort);

    return productSort;
};

export default sortable;
