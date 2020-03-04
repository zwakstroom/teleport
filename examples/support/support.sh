#!/bin/bash
set -euo pipefail

TELEPORT_VERSION="4.2.3"
TARGET="iot.gravitational.io:443"

if [ "$#" -ge 2 ]; then
    TOKEN=$1
    CUSTOMER=$2
else
  echo -e "Enter customer name and join token: ./support.sh <token> <customer>";
  exit 1;
fi

[ -n "$1" ] && TOKEN=$1 || { echo -n "Enter join token: "; read TOKEN; }
[ -n "$2" ] && CUSTOMER=$2 || { echo -n "Enter customer name: "; read CUSTOMER; }

for TOOL in curl tar
do
    command -v $TOOL >/dev/null 2>&1 || { echo >&2 "I require $TOOL but it's not installed. Aborting."; exit 1; }
done

if [[ "$OSTYPE" == "linux-gnu" ]]; then
    ARCH="linux-amd64"
    echo -e "Starting Teleport support agent on Linux..."
elif [[ "$OSTYPE" == "darwin"* ]]; then
    ARCH="darwin-amd64"
    echo -e "Starting Teleport support agent on Mac OS..."
else
    echo -e "Unsupported platform $OSTYPE"
    exit 1
fi

TEMP_DIR=$(mktemp -d -t teleport-XXXXXXXXXX)
echo -e "Created temp dir $TEMP_DIR"
echo -e "Entering $TEMP_DIR"
pushd $TEMP_DIR

finish()
{
    echo -e "Leaving $TEMP_DIR"
    popd
    echo -e "Deleting temp dir $TEMP_DIR"
    rm -rf $TEMP_DIR
    echo -e "Exiting...\n";
    exit 0;
}

trap finish EXIT

URL="https://get.gravitational.com/teleport-v${TELEPORT_VERSION}-$ARCH-bin.tar.gz"
echo -e "Downloading official teleport distribution from $URL"
curl -L -s $URL | tar xz -C $TEMP_DIR
cat > $TEMP_DIR/teleport.yaml <<- EOM
teleport:
  log:
    output: stdout
    severity: ERROR
  auth_token: "${TOKEN}"
  data_dir: "${TEMP_DIR}"
  auth_servers: ["${TARGET}"]
  storage:
    type: dir
    path: "${TEMP_DIR}"
ssh_service:
  enabled: yes
  labels:
    role: support
    customer: "${CUSTOMER}"
  commands:
  - name: host
    command: ['/bin/hostname']
    period: 1h0m0s
auth_service:
  enabled: no
proxy_service:
  enabled: no
EOM
echo -e "Starting up support agent in foreground. Press Ctrl-C to exit."
./teleport/teleport start --config=$TEMP_DIR/teleport.yaml
