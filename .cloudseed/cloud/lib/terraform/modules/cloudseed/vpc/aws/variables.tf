variable "env_name" {
  description = "the env name"
}

variable "multi_nat_gateway" {
  default     = false
  description = "enable nat gw per subnet, default is single nat per vpc"
}

variable "region" {
  description = "aws region where the cluster is being deployed"
}

variable "subnet_count" {
  description = "the number of subnets to deploy in this eks cluster."
  default     = "1"
}

variable "tags" {
  description = "A map of tags to add to all resources."
  type        = map(string)
  default     = {}
}

variable "vpc_access_ports" {
  default     = ["22", "80", "443"]
  description = "ports that vpc peering peer should have access to"
}

variable "vpc_cidr" {
  description = "vpn subnet block in cidr notation, please make a /16 when possible, e.g 172.20.0.0/16."
}
