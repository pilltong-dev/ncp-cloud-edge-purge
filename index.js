const core = require('@actions/core');
const hmacSHA256 = require("crypto-js/hmac-sha256");
const Base64 = require("crypto-js/enc-base64");

function buildHeaders(path, method) {
    const ncpAccessKeyId = core.getInput('ncp-access-key-id');
    const ncpSecretKey = core.getInput('ncp-secret-key');

    const timestamp = Date.now();
    const signature = Base64.stringify(hmacSHA256(`${method} ${path}\n${timestamp}\n${ncpAccessKeyId}`, ncpSecretKey));

    return {
        'Content-Type': 'application/json',
        'x-ncp-apigw-signature-v2': signature,
        'x-ncp-apigw-timestamp': timestamp,
        'x-ncp-iam-access-key': ncpAccessKeyId
    }
}

function buildBody() {
    const profileId = parseInt(core.getInput('edge-profile-id'));
    const edgeId = parseInt(core.getInput('edge-id'));
    const purgeType = core.getInput('purge-type');
    const purgeTarget = core.getInput('purge-target');

    if (purgeTarget) {
        return {profileId, edgeId, purgeType, purgeTarget};
    } else {
        return {profileId, edgeId, purgeType};
    }
}

async function purge() {
    const path = '/api/v1/purge';
    const method = 'POST';
    const headers = buildHeaders(path, method);
    const body = buildBody();
    console.log('purge request body: ', body)

    const response = await fetch('https://edge.apigw.ntruss.com' + path, {method, headers, body});
    if (response.ok) {
        const data = await response.json();
        console.log('purge success. response data: ', data);
        return data.result // array of purgeRequestId
    } else {
        const body = await response.text();
        throw new Error(`purge failed. response.status: ${response.status}, body: ${body}`);
    }
}

purge()
    .then(purgeRequestIds => core.setOutput('purge_request_ids', purgeRequestIds))
    .catch(error => core.setFailed(error.message));
