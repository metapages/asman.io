dependencies {
  paths = ["../infra"]
}

dependency "infra" {
  config_path = "../infra"
}

locals {
  env_vars = read_terragrunt_config(find_in_parent_folders("locals.hcl"))
}

terraform {
  source = "../../../../lib/terraform/modules//aws-rds"
}

include {
  path = find_in_parent_folders("terragrunt_cfg.hcl")
}

inputs = {
  providers = {
    aws = "aws"
  }
  region              = local.env_vars.locals.aws_region
  vpc_cidr            = "172.21.0.0/16"
  vpc_id              = dependency.infra.outputs.vpc_id
  vpc_private_subnets = dependency.infra.outputs.vpc_private_subnets
  vpc_sg_id           = dependency.infra.outputs.vpc_sg_id
}
