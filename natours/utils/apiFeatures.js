class APIFeatures {
  constructor(query, queryString){
    this.query = query;
    this.queryString = queryString;
    console.log('whaaat')
  }

  filter(){
    const queryObj = { ...this.queryString };
    const excludedFields = ['sort', 'page', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el])

    // Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(lte|lt|gte|gt)\b/g, match => `$${match}`);
    console.log(JSON.parse(queryStr));

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort(){
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ')
      this.query = this.query.sort(sortBy)
    } else {
      this.query = this.query.sort('-createdAt')
    }

    return this;
  }

  limitFields(){
    if (this.queryString.fields){
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

}

module.exports = APIFeatures
