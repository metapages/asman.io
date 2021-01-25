variable "location" {
  description = "gcp location, e.g ASIA, US, EU"
}

variable "kms_key_ring_name" {
  description = "kms keyring name"
}

variable "kms_crypto_key_name" {
  description = "kms crypto key name"
}

variable "containerregistry_svc_name" {
  description = "api service name to enable for using docker registry service"
  default     = "containerregistry.googleapis.com"
}
variable "project" {
  description = "gcp project"
}

variable "repos" {
  type = any

  default = ["browser",
    "auth",
    "graphql",
  ]
}

