# Generic steps used everywhere

def git_clone(enterprise=False):
    """Clone Teleport git repo, optionally using private key if enterprise is True"""
    environment_stanza = {}
    command_list = [
        "mkdir -p /go/src/github.com/gravitational/teleport",
        "cd /go/src/github.com/gravitational/teleport",
        "git clone https://github.com/gravitational/teleport.git .",
        "git checkout $DRONE_COMMIT",
        # create directories that might be needed
        "mkdir -p /go/cache /go/artifacts/e",
        # set version for pipelines that need it
        "echo $DRONE_SOURCE_BRANCH > /go/.drone_source_branch.txt",
        "if [[ \"${DRONE_TAG}\" != \"\" ]]; then echo \"${DRONE_TAG}\" > /go/.version.txt; else egrep ^VERSION Makefile | cut -d= -f2 > /go/.version.txt; fi; cat /go/.version.txt"
    ]
    if enterprise:
        command_list += [
            # fetch enterprise submodules
            "mkdir -m 0700 /root/.ssh && echo -n \"$GITHUB_PRIVATE_KEY\" > /root/.ssh/id_rsa && chmod 600 /root/.ssh/id_rsa",
            "ssh-keyscan -H github.com > /root/.ssh/known_hosts 2>/dev/null && chmod 600 /root/.ssh/known_hosts",
            "git submodule update --init e",
            # this is allowed to fail because pre-4.3 Teleport versions don't use the webassets submodules
            "git submodule update --init --recursive webassets || true",
            "rm -f /root/.ssh/id_rsa",
        ]
        environment_stanza = {
            "GITHUB_PRIVATE_KEY": {
                "from_secret": "GITHUB_PRIVATE_KEY"
            }
        }
    return {
        "name": "Check out code",
        "image": "docker:git",
        "environment": environment_stanza,
        "commands": command_list,
    }

def build_buildbox(buildbox_command, docker_image_name):
    """Build the named buildbox"""
    return {
        "name": "Build buildbox",
        "image": "docker",
        "environment": {
            "QUAYIO_DOCKER_USERNAME": {
                "from_secret": "QUAYIO_DOCKER_USERNAME",
            },
            "QUAYIO_DOCKER_PASSSWORD": {
                "from_secret": "QUAYIO_DOCKER_PASSSWORD",
            },
        },
        "volumes": [
            {
                "name": "dockersock",
                "path": "/var/run",
            },
        ],
        "commands": [
            "apk add --no-cache make",
            "chown -R $UID:$GID /go",
            "docker login -u=\"$QUAYIO_DOCKER_USERNAME\" -p=\"$QUAYIO_DOCKER_PASSWORD\" quay.io",
            "docker pull %s:$RUNTIME || true" %docker_image_name,
            "cd /go/src/github.com/gravitational/teleport",
            "make -C build.assets %s" %buildbox_command,
        ],
    }

def trigger_cron(cronjob_name):
    """Returns a trigger for a named cronjob"""
    return {
        "cron": ["%s" %cronjob_name],
    }

def trigger_tag(tag):
    """Returns a trigger for building when a tag is pushed"""
    return {
        "event": ["tag"],
        "ref": ["refs/tags/%s" %tag],
    }

def trigger_for_tests():
    """Tests trigger (build for PR, push or tag on master or branch/*)"""
    return {
        "branch": [
            "master",
            "branch/*",
        ],
        "event": {
            "exclude": [
                "cron",
                "promote",
                "rollback",
            ]
        }
    }

def trigger_on_pr_or_push():
    """Standard trigger (build on PR or push to master or branch/*)"""
    return {
        "branch": [
            "master",
            "branch/*",
        ],
        "event": {
            "include": [
                "push",
                "pull_request",
            ]
        }
    }

# For some reason, setting the environment for the pipeline globally like
# this doesn't seem to work
def runtime_env(runtime):
    """Provide standard runtime environment and UID/GID arguments"""
    return {
        "RUNTIME": "%s" %runtime,
        "UID": 1000,
        "GID": 1000,
    }

def dind_services():
    """Return standard Docker-in-docker service setup"""
    return [
        {
            "name": "Start Docker",
            "image": "docker:dind",
            "privileged": True,
            "volumes": [
                {
                    "name": "dockersock",
                    "path": "/var/run",
                },
            ],
        }
    ]

def dind_volumes():
    return [
        {
            "name": "dockersock",
            "temp": {},
        }
    ]

def slack_notification():
    return {
        "name": "Send Slack notification for build failures",
        "image": "plugins/slack",
        "settings": {
            "webhook": {
                "from_secret": "SLACK_WEBHOOK",
            },
            "channel": "teleport-builds",
            "template": """{{#if build.pull }}
            *{{#success build.status}}✔{{ else }}✘{{/success}} {{ uppercasefirst build.status }}*: <https://github.com/{{ repo.owner }}/{{ repo.name }}/pull/{{ build.pull }}|Pull Request #{{ build.pull }}>
            {{else}}
            *{{#success build.status}}✔{{ else }}✘{{/success}} {{ uppercasefirst build.status }}: Build #{{ build.number }}* (type: `{{ build.event }}`)
            {{/if}}
            Commit: <https://github.com/{{ repo.owner }}/{{ repo.name }}/commit/{{ build.commit }}|{{ truncate build.commit 8 }}>
            Branch: <https://github.com/{{ repo.owner }}/{{ repo.name }}/commits/{{ build.branch }}|{{ build.branch }}>
            Author: {{ build.author }}
            <{{ build.link }}|Visit build page ↗>
            """,
            "when": {
                "event": [
                    "push",
                ],
                "status": [
                    "failure",
                ]
            }
        }
    }

def run_test(test_type, test_name):
    """Run the specified test type"""
    return {
        "name": "Run %s" %test_name,
        "image": "docker",
        "environment": {
            "GOPATH": "/go",
        },
        "volumes": [
            {
                "name": "dockersock",
                "path": "/var/run",
            }
        ],
        "commands": [
            "apk add --no-cache make",
            "chown -R $UID:$GID /go",
            "cd /go/src/github.com/gravitational/teleport",
            "make -C build.assets %s" %test_type,
        ]
    }

def workspace(path="/go"):
    """Sets workspace path"""
    return {
        "path": "%s" %path,
    }

def clone():
    """Disables automatic git clone in pipelines"""
    return {
        "disable": True,
    }

def pipeline(name):
    return {
        "kind": "pipeline",
        "type": "kubernetes",
        "name:": "%s" %name,
    }

# Individual pipeline builders

def test():
    """Construct test pipeline"""
    return {
        "kind": "pipeline",
        "type": "kubernetes",
        "name": "test",
        "workspace": workspace(),
        "clone": clone(),
        "environment": runtime_env("go1.14.4"),
        "trigger": trigger_for_tests(),
        "steps": [
            git_clone(enterprise=True),
            build_buildbox("buildbox", "quay.io/gravitational/teleport-buildbox:$RUNTIME"),
            run_test("lint", "linter"),
            run_test("test", "unit tests"),
            run_test("integration", "integration tests"),
            slack_notification(),
        ],
        "services": dind_services(),
        "volumes": dind_volumes(),
    }

def test_docs():
    """Construct test-docs pipeline"""
    return {
        "kind": "pipeline",
        "type": "kubernetes",
        "name": "test-docs",
        "workspace": workspace(),
        "clone": clone(),
        "environment": runtime_env("go1.14.4"),
        "trigger": trigger_on_pr_or_push(),
        "steps": [
            git_clone(),
            {
                "name": "Run docs tests",
                "image": "golang:1.14.4",
                "commands": [
                    """cd /go/src/github.com/gravitational/teleport
                    git diff --raw ${DRONE_COMMIT}..${DRONE_TARGET_BRANCH:-master} | awk '{print $6}' | grep -E '^docs' | grep -v ^$ | cut -d/ -f2 | sort | uniq > /tmp/docs-versions-changed.txt
                    if [ $(stat --printf="%s" /tmp/docs-versions-changed.txt) -gt 0 ]; then
                    echo "Changes to docs detected, versions $(cat /tmp/docs-versions-changed.txt | tr '\n' ' ')"
                    # Check trailing whitespace
                    make docs-test-whitespace
                    # Check links
                    for VERSION in $(cat /tmp/docs-versions-changed.txt); do
                        if [ -f docs/$VERSION/milv.config.yaml ]; then
                        cd docs/$VERSION
                        echo "Running milv on docs/$VERSION:"
                        go get -u github.com/magicmatatjahu/milv
                        milv
                        echo "------------------------------"
                        cd -
                        else
                        echo "No milv config found, skipping docs/$VERSION"
                        fi
                    done
                    else echo "No changes to docs detected, not running tests"
                    fi"""
                ]
            }
        ],
    }

def pipeline_base(name, workspace_path="/go"):
    return {
        "kind": "pipeline",
        "type": "kubernetes",
        "name": "%s" %name,
        "workspace": workspace(workspace_path),
        "clone": clone(),
    }

def package_helm_chart():
    return {
        "name": "Package helm chart",
        "image": "alpine/helm:2.16.9",
        "commands": [
            "mkdir -p /tmp/chart",
            "cd /tmp/chart",
            "helm init --client-only",
            "helm package /tmp/go/src/github.com/gravitational/teleport/examples/chart/teleport",
            "helm repo index /tmp/chart",
        ]
    }

# def upload_artifacts_to_s3():
#     return {
#         "name": "Upload to S3",
#         "image": "plugins/s3",
#         "settings": {
#             "bucket": "charts.gravitational.io",
#             "access_key": {
#                 "from_secret": "PRODUCTION_CHARTS_AWS_ACCESS_KEY_ID",
#             },
#             "secret_key": {
#                 "from_secret": "PRODUCTION_CHARTS_AWS_SECRET_ACCESS_KEY",
#             },
#             "region": "us-east-2",
#             "acl": "public-read",
#             "source": "/tmp/chart/*",
#             "target": "/",
#             "strip_prefix": "/tmp/chart"
#         }
#         ]
#     }

def helm_cron_teleport():
    pipeline_dict = pipeline_base("helm-cron-teleport", workspace_path="/tmp")
    extra = {
        "environment": runtime_env("go1.14.4"),
        "trigger": trigger_cron("helm-cron-teleport"),
        "steps": [
            git_clone(),
            package_helm_chart(),
            {
                "name": "Upload to S3",
                "image": "plugins/s3",
                "settings": {
                    "bucket": "charts.gravitational.io",
                    "access_key": {
                        "from_secret": "PRODUCTION_CHARTS_AWS_ACCESS_KEY_ID",
                    },
                    "secret_key": {
                        "from_secret": "PRODUCTION_CHARTS_AWS_SECRET_ACCESS_KEY",
                    },
                    "region": "us-east-2",
                    "acl": "public-read",
                    "source": "/tmp/chart/*",
                    "target": "/",
                    "strip_prefix": "/tmp/chart"
                }
            }
        ]
    }
    pipeline_dict.update(extra)
    print(pipeline_dict)
    return pipeline_dict

def build_artifacts(name, makefile_command, os, arch, centos6=False, fips=False):
    buildbox = "teleport-buildbox"
    fips_stanza = "no"
    make_command = "make -C build.assets %s OS=$OS ARCH=$ARCH RUNTIME=$RUNTIME" %makefile_command
    if fips:
        fips_stanza = "yes"
        buildbox = "teleport-buildbox-fips"
        make_command = "make -C build.assets %s OS=$OS ARCH=$ARCH RUNTIME=$RUNTIME FIPS=yes" %makefile_command
        if centos6:
            buildbox = "teleport-buildbox-centos6-fips"
    elif centos6:
        buildbox = "teleport-buildbox-centos6"

    return {
        "name": "Build artifacts (%s)" %name,
        "image": "docker:git",
        "environment": {
            "GITHUB_PRIVATE_KEY": {
                "from_secret": "GITHUB_PRIVATE_KEY",
            },
            "UID": 1000,
            "GID": 1000,
            "GOPATH": "/go",
            "OS": "%s" %os,
            "ARCH": "%s" %arch,
            "FIPS": "%s" %fips_stanza,
        },
        "volumes": [
            {
                "name": "dockersock",
                "path": "/var/run",
            },
        ],
        "commands": [
            "apk add --no-cache make",
            "chown -R $UID:$GID /go",
            "docker pull quay.io/gravitational/%s:$RUNTIME || true" %buildbox,
            "cd /go/src/github.com/gravitational/teleport",
            "export VERSION=$(cat /go/.version.txt)",
            make_command
        ],
    }

def copy_artifacts(name, rename_oss=False, rename_ent=False, extra_name_stanza=""):
    oss_copy_command = None
    oss_rename_command = None
    ent_copy_command = None
    ent_rename_command = None
    if rename_oss:
        oss_copy_command = "find . -maxdepth 1 -iname \"teleport*.tar.gz\" -print -exec cp {} /go/artifacts \\;"
        oss_rename_command = "mv /go/artifacts/teleport-v$${VERSION}-linux-amd64-bin.tar.gz /go/artifacts/teleport-v$${VERSION}-linux-amd64%s-bin.tar.gz" %extra_name_stanza
    if rename_ent:
        ent_copy_command = "find e/ -maxdepth 1 -iname \"teleport*.tar.gz\" -print -exec cp {} /go/artifacts/e \\;"
        ent_rename_command = "mv /go/artifacts/e/teleport-v$${VERSION}-linux-amd64-bin.tar.gz /go/artifacts/teleport-ent-v$${VERSION}-linux-amd64%s-bin.tar.gz" %extra_name_stanza
    return {
        "name": "Copy artifacts (%s)" %name,
        "image": "docker",
        "commands": [
            "cd /go/src/github.com/gravitational/teleport",
            # copy release archives to artifact directory
            oss_copy_command,
            ent_copy_command,
            # rename artifact
            "export VERSION=$(cat /go/.version.txt)",
            oss_rename_command,
            ent_rename_command,
            # generate checksums
            "cd /go/artifacts && for FILE in teleport*.tar.gz; do sha256sum $FILE > $FILE.sha256; done && ls -l",
        ]
    }

def upload_artifacts_to_s3(
        bucket_var="AWS_S3_BUCKET",
        access_key_var="AWS_ACCESS_KEY_ID",
        secret_key_var="AWS_SECRET_KEY_ID",
        region="us-west-2"
    ):
    return {
        "name": "Upload to S3",
        "image": "plugins/s3",
        "settings": {
            "bucket": {
                "from_secret": "%s" %bucket_var,
            },
            "access_key": {
                "from_secret": "%s" %access_key_var,
            },
            "secret_key": {
                "from_secret": "%s" %secret_key_var,
            },
            "region": "%s" %region,
            "source": "/go/artifacts/*",
            "target": "/teleport/tag/${DRONE_TAG}",
            "strip_prefix": "/go/artifacts/"
        }
    }

def build_pipeline(pipeline_name, makefile_command, os, arch, centos6=False, fips=False):
    extra_name_stanza = ""
    rename_oss = False
    rename_ent = True
    if fips:
        if centos6:
            rename_oss = True
            extra_name_stanza = "-centos6-fips"
        else:
            extra_name_stanza = "-fips"
    elif centos6:
        rename_oss = True
        extra_name_stanza = "-centos6"

    pipeline_dict = pipeline_base(pipeline_name)
    extra = {
        "environment": runtime_env("go1.14.4"),
        "trigger": trigger_tag("v*"),
        "depends_on": ["test"],
        "services": dind_services(),
        "volumes": dind_volumes(),
        "steps": [
            git_clone(enterprise=True),
            build_artifacts(pipeline_name, makefile_command, os, arch, centos6=centos6, fips=fips),
            copy_artifacts(pipeline_name, rename_oss, rename_ent, extra_name_stanza),
            upload_artifacts_to_s3(),
        ]
    }
    pipeline_dict.update(extra)
    print(pipeline_dict)
    return pipeline_dict

def main(ctx):
    return [
        # test(),
        # test_docs(),
        # helm_cron_teleport(),
        #build_pipeline("build-linux-amd64", "release", "linux", "amd64"),
        #build_pipeline("build-linux-amd64-fips", "release-fips", "linux", "amd64", fips=True),
        #build_pipeline("build-linux-amd64-centos6", "release-centos6", "linux", "amd64", centos6=True),
        build_pipeline("build-linux-amd64-centos6-fips", "release-centos6-fips", "linux", "amd64", centos6=True, fips=True),
    ]
