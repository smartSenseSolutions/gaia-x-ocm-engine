# OCM ER Diagram

```mermaid
    flowchart LR
        gateway[API Gateway] -->Connection
        subgraph test
        service1 --> service2
        subgraph subgraph
        subgraph2-->subgraph1
        end
        end
```
