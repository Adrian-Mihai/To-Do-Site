import request from "superagent";

const REQ_HELPER = {
  postWithoutCooki: url => {
    return request
      .post(url)
      .set("X-API-Key", "foobar")
      .set("accept", "json")
      .withCredentials();
  },
  putWithoutCooki: url => {
    return request
      .put(url)
      .set("X-API-Key", "foobar")
      .set("accept", "json")
      .withCredentials();
  },
  getWithCooki: url => {
    return request
      .get(url)
      .set("X-API-Key", "foobar")
      .set("accept", "json")
      .withCredentials();
  },
  deleteWithCooki: url => {
    return request
      .delete(url)
      .set("X-API-Key", "foobar")
      .set("accept", "json")
      .withCredentials();
  }
};

export default REQ_HELPER;
