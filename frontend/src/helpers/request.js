import request from 'superagent';

const REQ_HELPER = {
    postWithoutCooki: url =>{
        return request
            .post(url)
            .set('X-API-Key', 'foobar')
            .set('accept', 'json')
    },

    putWithoutCooki : url => {
        return request
            .put(url)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
    },
};

export default REQ_HELPER;