locals {
  env_vars = read_terragrunt_config(find_in_parent_folders("locals.hcl"))
}

generate "locals" {
  if_exists = "overwrite_terragrunt"
  path      = "tg_locals.tf"
  contents  = file("locals.hcl")

}

generate "provider" {
  path      = "tg_provider.tf"
  if_exists = "overwrite_terragrunt"
  contents  = <<EOF
terraform {
  required_version = "~> 0.12.28"
}

provider "google" {
  region  = "${local.env_vars.locals.gcp_region}"
  version = "~> 3.35.0"
}
EOF
}
