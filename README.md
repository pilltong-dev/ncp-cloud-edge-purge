# ncp-cloud-edge-purge

This action purge cache data of NCP Cloud Edge.

## Inputs

### `ncp-access-key-id`

**Required** NCP Access Key ID.

### `ncp-secret-key`

**Required** NCP Secret Key.

### `ncp-region`

**Required** NCP Region.

### `edge-profile-id`

**Required** NCP Cloud Edge Profile ID.

### `edge-id`

**Required** NCP Cloud Edge ID.

## Outputs

### `purge_request_ids`

purge request ids.

## Example usage

```yaml
uses: pilltong-dev/ncp-cloud-edge-purge@master
with:
  ncp-access-key-id: '#########'
  ncp-secret-key: '#########'
  ncp-region: 'ncp-region'
  edge-profile-id: 'edge-profile-id'
  edge-id: 'edge-id'
```

## References

- [(GITHUB) Creating a JavaScript action](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action)
- [(NCP) Requesting purge](https://api.ncloud-docs.com/docs/en/purge-request)
