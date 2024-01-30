const core = require('@actions/core');
const github = require('@actions/github');

try {
    const ncpAccessKeyId = core.getInput('ncp-access-key-id');
    const ncpSecretKey = core.getInput('ncp-secret-key');
    const edgeProfileId = core.getInput('edge-profile-id');
    const edgeId = core.getInput('edge-id');

    console.log('ncp-access-key-id length: ', ncpAccessKeyId.length);
    console.log('ncp-secret-key length: ', ncpSecretKey.length);
    console.log('edge-profile-id: ', edgeProfileId);
    console.log('edge-id: ', edgeId);

    const purgeRequestIds = [1, 2, 3, 4]; // TODO: Call NCP API to purge cache
    core.setOutput('purge_request_ids', purgeRequestIds);
} catch (error) {
    core.setFailed(error.message);
}
