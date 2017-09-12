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
            .set('X-API-Key', 'foobar')
            .set('accept', 'json')
    },
};

export default REQ_HELPER;