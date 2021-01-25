locals {
  env_vars = read_terragrunt_config(find_in_parent_folders("locals.hcl"))
}

generate "locals" {
  if_exists = "overwrite_terragrunt"
  path      = "tg_locals.tf"
  contents  = file("locals.hcl")

}

remote_state {
  backend = "s3"
  generate = {
    path      = "tg_backend.tf"
    if_exists = "overwrite_terragrunt"
  }
  config = {
    bucket         = "${get_env("ENV")}-tf-${local.env_vars.locals.aws_region}"
    key            = "${path_relative_to_include()}/terraform.tfstate"
    region         = "${local.env_vars.locals.aws_region}"
    encrypt        = true
    dynamodb_table = "${get_env("ENV")}-tf-${local.env_vars.locals.aws_region}"
    profile        = "metapages"
  }
}

generate "provider" {
  path      = "tg_provider.tf"
  if_exists = "overwrite_terragrunt"
  contents  = <<EOF
terraform {
  required_version = "~> 0.12.29"
}

provider "aws" {
  region  = "${local.env_vars.locals.aws_region}"
  version = "~> 2.70"
  profile = "metapages"
}
EOF
}
