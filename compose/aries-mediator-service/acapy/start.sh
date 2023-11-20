#!/bin/bash

set -euxo pipefail

HTTP_IN_MEDIATOR_URL=${MEDIATOR_HTTP_IN_ENDPOINT_URL}
WSS_MEDIATOR_URL=${MEDIATOR_WSS_ENDPOINT_URL}


echo "Starting agent with endpoint(s): ${HTTP_IN_MEDIATOR_URL} wss://${WSS_MEDIATOR_URL#*://*}"

aca-py start \
    --auto-provision \
    --arg-file ${MEDIATOR_ARG_FILE} \
    --label "${MEDIATOR_AGENT_LABEL}" \
    --inbound-transport http 0.0.0.0 ${MEDIATOR_AGENT_HTTP_IN_PORT} \
    --inbound-transport ws 0.0.0.0 ${MEDIATOR_AGENT_WS_IN_PORT} \
    --outbound-transport ws \
    --outbound-transport http \
    --wallet-type indy \
    --wallet-storage-type postgres_storage \
    --admin 0.0.0.0 ${MEDIATOR_AGENT_HTTP_ADMIN_PORT} \
    --admin-api-key ${MEDIATOR_AGENT_ADMIN_API_KEY} \
    --endpoint ${HTTP_IN_MEDIATOR_URL} wss://${WSS_MEDIATOR_URL#*://*}
