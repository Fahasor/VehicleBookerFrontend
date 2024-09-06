import CrudApi from "./CrudApi";

export default class PendingDriveApi extends CrudApi{
    addUsersToRecord(driveId, idList) {
        return this.sendRequest("put", idList, `/users?id=${driveId}`);
    }

    deleteUsersFromRecord(driveId, idList) {
        return this.sendRequest("delete", idList, `/users?id=${driveId}`);
    }
}