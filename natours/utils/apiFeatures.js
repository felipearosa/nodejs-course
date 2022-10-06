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
    return this.query;
  }

}

module.exports = APIFeatures
