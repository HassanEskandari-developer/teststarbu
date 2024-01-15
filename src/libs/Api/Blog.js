import WebServiceRequest from '../Api/WebServiceRequest'

class BlogCreateCommentRequest extends WebServiceRequest {
    constructor (context) {
        super(context)
    }
    setParams(id){
        super.setTag('posts/'+id+'/comment')
    }
    setRequestParam(data){
        super.setRequestParamDataObj(data)
    }
}

class BlogGetRequest extends WebServiceRequest {
    constructor (context) {
        super(context)
        super.setTag('posts/1')
    }
}

export  {
    BlogCreateCommentRequest,
    BlogGetRequest,
};
