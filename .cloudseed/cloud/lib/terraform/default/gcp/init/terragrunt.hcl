locals {
  env_vars = read_terragrunt_config(find_in_parent_folders("locals.hcl"))
}

terraform {
  source = "../../cloud/lib/terraform/modules//gcp-init"
}

include {
  path = find_in_parent_folders("terragrunt_cfg.hcl")
}

inputs = {
  providers = {
    gcp = "gcp"
  }
  location = "US"
}
