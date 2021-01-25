locals {
  env_vars = read_terragrunt_config(find_in_parent_folders("locals.hcl"))
}

terraform {
  source = "../../../../lib/terraform/modules//aws-init"
}

include {
  path = find_in_parent_folders("terragrunt_cfg.hcl")
}

inputs = {
  providers = {
    aws = "aws"
  }
}
