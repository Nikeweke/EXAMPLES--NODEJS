## Log insights queries


#### Get timestamps and trace_ids only

```
fields @timestamp, trace_id
| filter @message like /5000ms/ 
| sort @timestamp desc 
| limit 10000

```


#### Find a records by traceId (used in Iterable-events-service) with specific fields

```
fields @timestamp, level, component, type as eventName, msg
| filter trace_id = "69690108e8f9f4b0584b6bfb15d4087d"
| filter msg not like "Annotation" AND  component not like "typeorm" AND msg not like "Metadata"
| sort @timestamp asc
| limit 1000
```
