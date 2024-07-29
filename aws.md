# AWS

### `Awsume` How to make "Awsume" work on windows

```sh
alias awsume='. awsume'
awsume engineeringTest
```
<br />

### `Logs Insights` Look for "error" word in messages

> Also you can go "Help" > "Examples" to see more example queries

```sh
# looing for "error" in message
fields @timestamp, @message, @logStream, @log
| filter @message like /(?i)(error)/
```
<br />

### `AWS XRay` Mocking aws-xray-sdk to fix error: "Failed to get the current sub/segment from the context." 

###### __mocks__/aws-xray-sdk.ts
```ts
/* eslint-disable camelcase */
// Mock out aws-xray-core to avoid memory leak warnings in Jest
const mockSegment = {
  parent: { id: '', name: '', start_time: 0, trace_id: '' },
  segment: { id: '', name: '', start_time: 0, trace_id: '' },
  name: '',
  start_time: 0,
  addErrorFlag(): void {},
  addFaultFlag(): void {},
  addNewSubsegment(_name: string) {
    return this;
  },
  addPrecursorId(_id: string): void {},
  addSqlData(_sqlData: any): void {},
  addSubsegment(_subsegment: any): void {},
  addThrottleFlag(): void {},
  decrementCounter(): void {},
  flush(): void {},
  format(): string {
    return '';
  },
  isClosed(): boolean {
    return false;
  },
  removeSubsegment(_subsegment: any): void {},
  streamSubsegments(): true | undefined {
    return undefined;
  },
  toJSON(): { [p: string]: any } {
    return {};
  },
  toString(): string {
    return '';
  },
  close: () => {},
  id: 'MockSegment',
  incrementCounter: (_additional: number) => {},
  addAttribute: (_name: string, _data: any) => {},
  addAnnotation: (_key: string, _value: any) => {},
  addMetadata: (_key: string, _value: any, _namespace?: string) => {},
  addError: (err: Error | string, _remoteopt?: boolean) => {
    console.info('Mock Monitoring ERROR:', err);
  },
  addRemoteRequestData: (_req: any, _res: any, _downstreamXRayEnabled: boolean) => {},
};

const MockAwsXray = {
  capturePostgres: jest.fn(),
  getNamespace: () => ({
    runPromise: (cb: any) => {
      return cb();
    },
  }),
  captureAWSv3Client: (client: any) => client,
  getSegment: () => mockSegment,
  resolveSegment: () => mockSegment,
  setSegment: jest.fn(),
  Segment: jest.fn().mockImplementation(() => mockSegment),
  utils: {
    processTraceData: jest.fn().mockReturnValue({ root: '111-222-333' }),
  },
};

module.exports = { ...MockAwsXray, default: MockAwsXray };
```
