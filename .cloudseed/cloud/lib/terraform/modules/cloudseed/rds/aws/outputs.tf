output "rds_admin_pw" {
  value       = random_password.rds_admin_pw.result
  sensitive   = true
  description = "rds admin pw"
}

output "rds_admin_user" {
  value       = join(",", aws_rds_cluster.rds.*.master_username)
  description = "rds admin user name"
}

output "rds_db_host" {
  value       = join(",", aws_rds_cluster.rds.*.endpoint)
  description = "rds host address"
}

output "rds_db_host_readonly" {
  value       = join(",", aws_rds_cluster.rds.*.reader_endpoint)
  description = "rds host address readonly endpoint"
}

output "rds_db_port" {
  value       = join(",", aws_rds_cluster.rds.*.port)
  description = "rds port"
}

output "rds_db_name" {
  value       = join(",", aws_rds_cluster.rds.*.database_name)
  description = "database name to use for connections"
}

# output "hasura_user" {
#   value       = "hasura_${var.env_name}_user"
#   description = "hasura user name"
# }
#
# output "hasura_user_pw" {
#   value       = join(",", random_password.pg_hasura_user_pw.*.result)
#   description = "hasura user pw"
# }
