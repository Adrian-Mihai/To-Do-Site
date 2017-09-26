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
    getWithCooki: url =>{
        return request
            .get(url)
            .set('X-API-Key', 'foobar')
            .set('accept', 'json')
            .withCredentials()
    },
};

export default REQ_HELPER;