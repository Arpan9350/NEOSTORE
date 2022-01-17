class ApiFeatures{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr
    }
    search(){
        const keyword=this.queryStr.keyword ?
        {
            product_name:{
                $regex:this.queryStr.keyword,
                $options:"i",
            },
        }
        :{}
        console.log(this.queryStr.keyword)
        this.query=this.query.find({...keyword});
        return this;
    }

    filter(){
        const queryCopy={...this.queryStr}
        
        
        //removing some field for category
        const removeFields=["keyword","page","limit"];

        removeFields.forEach(key=>delete queryCopy[key])

        //Filter For Price and Rating 
        // console.log(queryCopy);
        let queryStr=JSON.stringify(queryCopy);
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);

        

        this.query=this.query.find(JSON.parse(queryStr));


        
        

        return this;

    }
    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page)|| 1; // 50 -10

        const skip = resultPerPage *(currentPage-1) ;
        
        this.query= this.query.limit(resultPerPage).skip(skip);
        
        return this;
         

    }

};




export default ApiFeatures