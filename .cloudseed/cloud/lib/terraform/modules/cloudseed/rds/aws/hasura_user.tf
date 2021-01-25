# #generate job template for creating hasura user
# data "template_file" "pg_hasura_user" {
#   template = file("${path.module}/templates/pg_hasura_user.yaml.tpl")
#
#   vars = {
#     hasura_user_secret = var.hasura_user_secret
#
#   }
# }
#
# #create random password for hasura user
# resource "random_password" "pg_hasura_user_pw" {
#   length  = 32
#   special = false
# }
#
# #create configmap for the psql create user script
# resource "kubernetes_config_map" "pg_hasura_user" {
#   metadata {
#     name = "pg-hasura-user-script"
#   }
#
#   data = {
#     "pg-hasura-user.sh" = <<DATA
# #!/usr/bin/env bash
# USER="hasura_${var.env_name}_user"
# if [ ! -z $(psql -tAc "SELECT 1 FROM pg_roles WHERE rolname='$${USER}'") ]; then
#     echo "user already exists"
# else
#     echo "creating user"
#     psql -c "CREATE USER $${USER};"
# fi
# echo "setting user privileges"
# psql <<PSQL
#     BEGIN;
#
#     SELECT pg_advisory_xact_lock(1);
#
#     -- disable these REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA information_schema FROM $${USER};
#     -- disable these REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA pg_catalog FROM $${USER};
#     REVOKE ALL PRIVILEGES ON DATABASE ${join(",", aws_rds_cluster.rds.*.database_name)} FROM $${USER};
#     REVOKE ALL PRIVILEGES ON SCHEMA public FROM $${USER};
#     REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA public FROM $${USER};
#     REVOKE ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public FROM $${USER};
#
#     CREATE EXTENSION IF NOT EXISTS pgcrypto;
#     CREATE SCHEMA IF NOT EXISTS hdb_catalog;
#     CREATE SCHEMA IF NOT EXISTS hdb_views;
#     ALTER SCHEMA hdb_catalog OWNER TO $${USER};
#     ALTER SCHEMA hdb_views OWNER TO $${USER};
#
#     -- GRANT SELECT ON ALL TABLES IN SCHEMA information_schema TO $${USER};
#     -- GRANT SELECT ON ALL TABLES IN SCHEMA pg_catalog TO $${USER};
#     GRANT CONNECT ON DATABASE ${join(",", aws_rds_cluster.rds.*.database_name)} TO $${USER};
#     GRANT USAGE ON SCHEMA public TO $${USER};
#     GRANT ALL ON ALL TABLES IN SCHEMA public TO $${USER};
#     GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO $${USER};
#     ALTER ROLE $${USER} WITH PASSWORD '$ADMIN_USER_PW';
#
#     COMMIT;
# PSQL
# DATA
#
#   }
# }
#
# #create secret to store sensitive create user data
# resource "kubernetes_secret" "pg_hasura_user" {
#   metadata {
#     name = var.hasura_user_secret
#   }
#
#   data = {
#     PGUSER        = "${var.env_name}.dbadmin"
#     PGPASSWORD    = random_password.rds_admin_pw.result
#     PGHOST        = join(",", aws_rds_cluster.rds.*.endpoint)
#     PGDATABASE    = var.env_name
#     ADMIN_USER_PW = random_password.pg_hasura_user_pw.result
#   }
#
#
#   type = "Opaque"
# }
#
# #create job using the rendered template
# resource "null_resource" "pg_hasura_user" {
#   provisioner "local-exec" {
#     command = <<DATA
# cat <<EOF | kubectl apply -f - --kubeconfig ../../../../../kubeconfig_${var.env_name}.yaml
# ${data.template_file.pg_hasura_user.rendered}
# EOF
# DATA
#
#   }
#
#   triggers = {
#     pg_hasura_user_rendered              = data.template_file.pg_hasura_user.rendered
#     random_password_changed              = random_password.pg_hasura_user_pw.result
#     kubernetes_secret_pg_hasura_user     = sha256(jsonencode(kubernetes_secret.pg_hasura_user.data))
#     kubernetes_config_map_pg_hasura_user = sha256(jsonencode(kubernetes_config_map.pg_hasura_user.data))
#   }
#
#   depends_on = [
#     aws_rds_cluster.rds,
#     aws_rds_cluster_instance.rds,
#   ]
# }
