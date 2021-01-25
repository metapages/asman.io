variable "env_name" {
  description = "the env name"
}

variable "repos" {
  type = any

  default = ["browser",
    "auth",
    "graphql",
  ]
}

