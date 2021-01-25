creation_rules:
  ##${env_name}
  - path_regex: .*/cloud/env/${env_name}/aws/.*
    kms: ${kms_key_arn}
