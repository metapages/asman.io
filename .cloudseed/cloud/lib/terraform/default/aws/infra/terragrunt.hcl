locals {
  env_vars = read_terragrunt_config(find_in_parent_folders("locals.hcl"))
}

terraform {
  source = "../../../../lib/terraform/modules//aws-vpc"
}

include {
  path = find_in_parent_folders("terragrunt_cfg.hcl")
}

inputs = {
  providers = {
    aws = "aws"
  }
  region   = local.env_vars.locals.aws_region
  vpc_cidr = "172.21.0.0/16"
}
