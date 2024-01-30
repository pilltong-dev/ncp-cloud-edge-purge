const core = require('@actions/core');
const github = require('@actions/github');
const hmacSHA256 = require("crypto-js/hmac-sha256");
const Base64 = require("crypto-js/enc-base64");

const CLOUD_EDGE_API_BASE_URL = "https://edge.apigw.ntruss.com"

try {
    const ncpAccessKeyId = core.getInput('ncp-access-key-id');
    const ncpSecretKey = core.getInput('ncp-secret-key');
    const edgeProfileId = core.getInput('edge-profile-id');
    const edgeId = core.getInput('edge-id');
    const path = '/api/v1/profiles';

    // build signature
    const timestamp = Date.now();
    const signature = Base64.stringify(hmacSHA256(`GET ${path}\n${timestamp}\n${ncpAccessKeyId}`, ncpSecretKey));
    const data = await fetch(CLOUD_EDGE_API_BASE_URL + path, {
        headers: {
            'Content-Type': 'application/json',
            'x-ncp-apigw-signature-v2': signature,
            'x-ncp-apigw-timestamp': timestamp,
            'x-ncp-iam-access-key': ncpAccessKeyId
        },
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            return data;
        })
        .catch((error) => {
            console.error('Error:', error);
            return error;
        });
    console.log('data: ', data);
    console.log('edge-profile-id: ', edgeProfileId);
    console.log('edge-id: ', edgeId);

    const purgeRequestIds = [1, 2, 3, 4]; // TODO: Call NCP API to purge cache
    core.setOutput('purge_request_ids', purgeRequestIds);
} catch (error) {
    core.setFailed(error.message);
}
