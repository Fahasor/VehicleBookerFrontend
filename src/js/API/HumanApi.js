import CrudApi from "./CrudApi";

export default class HumanApi extends CrudApi{
    getByPhoneNumber(phoneNumber) {
        return this.sendRequest("get", null, `?phoneNumber=${encodeURIComponent(phoneNumber)}`);
    }
}