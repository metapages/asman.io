variable "namespace" {
  default     = "default"
  description = "modify the db name from $env_name to $namespace_$env_name"
}

variable "deletion_protection" {
  default     = true
  description = "enable deletion protection to avoid being able to destroy cluster"
}

variable "hasura_user_secret" {
  default     = "hasura-user-secret"
  description = "name of the kube secret used for hasura create user"
}

variable "vpc_id" {
  description = "vpc id used to setup cluster in correct vpc"
}

variable "vpc_sg_id" {
  type        = list(string)
  description = "list of eks worker security groups to give access to rds"
}

variable "vpc_private_subnets" {
  type        = list(string)
  description = "list of eks worker group subnets"
}

variable "engine_version" {
  description = "rds engine version to deploy"
  default     = "11.6"
}
variable "instance_class" {
  description = "rds instance type to use for cluster instances"
  default     = "db.t3.medium"
}
variable "backup_retention" {
  description = "retention period for rds backups"
  default     = "30"
}
variable "rds_replicas" {
  default     = 1
  description = "number of rds instances to run in the cluster"
}
variable "env_name" {
  description = "name of env this rds should be associated with, route53 setup will take this name+ '.eks' , e.g foo = foo.eks"
}
