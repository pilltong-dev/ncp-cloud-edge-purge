const core = require('@actions/core');
const github = require('@actions/github');
const hmacSHA256 = require("crypto-js/hmac-sha256");
const Base64 = require("crypto-js/enc-base64");

const CLOUD_EDGE_API_BASE_URL = "https://edge.apigw.ntruss.com"

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

async function purge() {
    const edgeProfileId = core.getInput('edge-profile-id');
    const edgeId = core.getInput('edge-id');
    const path = '/api/v1/profiles';
    const method = 'GET';

    console.log('edge-profile-id: ', edgeProfileId);
    console.log('edge-id: ', edgeId);

    // build signature
    const headers = buildHeaders(path, method);
    const response = await fetch(CLOUD_EDGE_API_BASE_URL + path, {headers, method});
    const data = await response.json();
    console.log('data: ', data);

    return data.result // array of purgeRequestId
}

purge()
    .then(purgeRequestIds => core.setOutput('purge_request_ids', purgeRequestIds))
    .catch(error => core.setFailed(error.message));
