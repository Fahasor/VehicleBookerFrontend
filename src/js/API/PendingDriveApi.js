import CrudApi from "./CrudApi";

export default class PendingDriveApi extends CrudApi{
    addUsersToRecord(driveId, idList) {
        return this.sendRequest("put", idList, `/users?id=${driveId}`);
    }

    updateDriverByPhoneNumber(driveId, newPhone) {
        return this.sendRequest("put", null, `/driver?id=${driveId}&newDriverPhone=${encodeURIComponent(newPhone)}`);
    }

    deleteUsersFromRecord(driveId, idList) {
        return this.sendRequest("delete", idList, `/users?id=${driveId}`);
    }
}