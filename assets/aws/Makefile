# VPC ID used for builds
BUILD_VPC_ID ?=

# VPC subnet used for builds
BUILD_SUBNET_ID ?=

# Public AMI name
PUBLIC_AMI_NAME ?=

# Default build region
AWS_REGION ?= us-west-2

# Teleport version
# This must be a _released_ version of Teleport, i.e. one which has binaries
# available for download on https://gravitational.com/teleport/download
# Unreleased versions will fail to build.
TELEPORT_VERSION ?= 4.3.7

# Teleport UID is the UID of a non-privileged 'teleport' user
TELEPORT_UID ?= 1007

# Instance type to build the AMI on
INSTANCE_TYPE ?= t2.micro

# Use comma-separated values without spaces for multiple regions
# For now, limit AMI to regions with DynamoDB encryption at rest enabled
# https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/EncryptionAtRest.html
# https://aws.amazon.com/about-aws/whats-new/2018/04/amazon-dynamodb-encryption-at-rest-now-available-in-additonal-regions/
DESTINATION_REGIONS ?= us-east-1,us-east-2,us-west-1,us-west-2,ap-south-1,ap-northeast-2,ap-southeast-1,ap-southeast-2,ap-northeast-1,ca-central-1,eu-central-1,eu-west-1,eu-west-2,sa-east-1

# Generate timestamp for builds
BUILD_TIMESTAMP := $(shell TZ=UTC /bin/date "+%Y%m%d-%H%M%S%Z")

# S3 Bucket ID
S3_BUCKET_ID ?=

# Telegraf version
TELEGRAF_VERSION ?= 1.9.3

# InfluxDB version
INFLUXDB_VERSION ?= 1.7.1

# Grafana version
GRAFANA_VERSION ?= 5.4.3

# AWS account ID which hosts the public Teleport AMIs
AWS_ACCOUNT_ID ?= 126027368216
export


# Build local 'debug' AMI
.PHONY: oss
oss: TELEPORT_TYPE=oss
oss: check-vars
oss:
	@echo "Building image $(TELEPORT_VERSION) $(TELEPORT_TYPE)"
	@echo "BUILD_TIMESTAMP=$(BUILD_TIMESTAMP)"
	mkdir -p files/build
	packer build -force -var build_timestamp=$(BUILD_TIMESTAMP) -only teleport-aws-linux single-ami.json
	@echo "$(BUILD_TIMESTAMP)" > files/build/oss_build_timestamp.txt

# Build named 'production' AMI and marketplace version
.PHONY: oss-ci-build
oss-ci-build: TELEPORT_TYPE=oss
oss-ci-build: check-vars
oss-ci-build:
	@echo "Building image $(TELEPORT_VERSION) $(TELEPORT_TYPE) via CI"
	@echo "Public AMI name: $(PUBLIC_AMI_NAME)"
	@echo "BUILD_TIMESTAMP=$(BUILD_TIMESTAMP)"
	mkdir -p files/build
	packer build -force -var ami_name=$(PUBLIC_AMI_NAME) -var build_timestamp=$(BUILD_TIMESTAMP) -except teleport-aws-linux-fips single-ami.json
	@echo "$(BUILD_TIMESTAMP)" > files/build/oss_build_timestamp.txt

.PHONY: change-amis-to-public-oss
change-amis-to-public-oss:
	@echo "Making OSS AMIs public"
	bash files/make-amis-public.sh oss

# Build local 'debug' AMI
.PHONY: ent
ent: TELEPORT_TYPE=ent
ent: check-vars
	@echo "Building image $(TELEPORT_VERSION) $(TELEPORT_TYPE)"
	@echo "BUILD_TIMESTAMP=$(BUILD_TIMESTAMP)"
	mkdir -p files/build
	packer build -force -var build_timestamp=$(BUILD_TIMESTAMP) -only teleport-aws-linux single-ami.json
	@echo "$(BUILD_TIMESTAMP)" > files/build/ent_build_timestamp.txt

# Build named 'production' AMI and marketplace version
.PHONY: ent-ci-build
ent-ci-build: TELEPORT_TYPE=ent
ent-ci-build: check-vars
ent-ci-build:
	@echo "Building image $(TELEPORT_VERSION) $(TELEPORT_TYPE) via CI"
	@echo "Public AMI name: $(PUBLIC_AMI_NAME)"
	@echo "FIPS AMI name: $(FIPS_AMI_NAME)"
	@echo "BUILD_TIMESTAMP=$(BUILD_TIMESTAMP)"
	mkdir -p files/build
	packer build -force -var ami_name=$(PUBLIC_AMI_NAME) -var fips_ami_name=$(FIPS_AMI_NAME) -var build_timestamp=$(BUILD_TIMESTAMP) single-ami.json
	@echo "$(BUILD_TIMESTAMP)" > files/build/ent_build_timestamp.txt

.PHONY: change-amis-to-public-ent
change-amis-to-public-ent:
	@echo "Making Enterprise AMIs public"
	bash files/make-amis-public.sh ent

.PHONY: change-amis-to-public-ent-fips
change-amis-to-public-ent-fips:
	@echo "Making FIPS Enterprise AMIs public"
	bash files/make-amis-public.sh ent-fips


# Other helpers
.PHONY: check-vars
check-vars:
	@if [ -z "$(TELEPORT_VERSION)" ]; then \
	  echo "TELEPORT_VERSION is not set"; exit 1; \
	fi;

.PHONY: update-ami-ids-cloudformation
update-ami-ids-cloudformation:
	@echo -e "\nUpdating OSS Cloudformation image IDs"
	./update-ami-ids.sh -a $(AWS_ACCOUNT_ID) -m cloudformation -t oss -r $(DESTINATION_REGIONS) -v $(TELEPORT_VERSION)
	@echo -e "\nUpdating Enterprise Cloudformation image IDs"
	./update-ami-ids.sh -a $(AWS_ACCOUNT_ID) -m cloudformation -t ent -r $(DESTINATION_REGIONS) -v $(TELEPORT_VERSION)

.PHONY: update-ami-ids-terraform
update-ami-ids-terraform:
	@echo -e "\nUpdating OSS Terraform image IDs"
	./update-ami-ids.sh -a $(AWS_ACCOUNT_ID) -m terraform -t oss -r $(DESTINATION_REGIONS) -v $(TELEPORT_VERSION)
	@echo -e "\nUpdating Enterprise Terraform image IDs"
	./update-ami-ids.sh -a $(AWS_ACCOUNT_ID) -m terraform -t ent -r $(DESTINATION_REGIONS) -v $(TELEPORT_VERSION)
	@echo -e "\nUpdating Enterprise FIPS Terraform image IDs"
	./update-ami-ids.sh -a $(AWS_ACCOUNT_ID) -m terraform -t ent-fips -r $(DESTINATION_REGIONS) -v $(TELEPORT_VERSION)
