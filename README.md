# ncp-cloud-edge-purge

This action purge cache data of NCP Cloud Edge.

## Inputs

### `ncp-access-key-id`

**Required** NCP Access Key ID.

### `ncp-secret-key`

**Required** NCP Secret Key.

### `edge-profile-id`

**Required** NCP Cloud Edge Profile ID.

### `edge-id`

**Required** NCP Cloud Edge ID.

### `purge-type`

**Required** Purge type. (default: `ALL`)

| Value       | Description                       | purgeTarget restrictions                              | Examples                                            |
|-------------|-----------------------------------|-------------------------------------------------------|-----------------------------------------------------|
| `ALL`       | (**DEFAULT**) Purge all contents  | Must be omitted                                       | null                                                |
| `DIRECTORY` | Purge by directory                | Starts with '/' <br> Ends with '/*'                   | /* <br> /src/* <br> /src/images/*                   |
| `PATTERN`   | Purge content by extension        | Starts with '/' <br> Ends with extension like '*.abc' | /*.jpg <br> /static/*.png <br> /static/images/*.css |
| `URL`       | Purge designated content with URL | Starts with '/' <br> '*' cannot be used               | /src/css/main.css?version=20221124                  |

### `purge-target`

**Conditional** Purge target list. Refer to description about PurgeType.

## Outputs

### `purge_request_ids`

Purge request number list.

## Example usage

```yaml
uses: pilltong-dev/ncp-cloud-edge-purge@v1
with:
  ncp-access-key-id: '#########' # NCP Access Key ID
  ncp-secret-key: '#########' # NCP Secret Key
  edge-profile-id: 1234 # NCP Cloud Edge PROFILE_ID
  edge-id: 5678 # NCP Cloud Edge CDN_EDGE_ID
  purge-type: 'ALL'
```

## References

- [(GITHUB) Creating a JavaScript action](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action)
- [(NCP) Requesting purge](https://api.ncloud-docs.com/docs/en/purge-request)
