#create db subnet group for rds
resource "aws_db_subnet_group" "rds" {
  name       = "${var.env_name}-rds-subnet-group"
  subnet_ids = var.vpc_private_subnets

  tags = {
    Name        = "${var.env_name}-rds-subnet-group"
    Environment = var.env_name
  }
}

#create security group for rds
resource "aws_security_group" "rds" {
  name   = "${var.env_name}-rds-sg"
  vpc_id = var.vpc_id

  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = var.vpc_sg_id
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${var.env_name}-rds-sg"
    Environment = var.env_name
  }
}

#create random password for rds admin pw
resource "random_password" "rds_admin_pw" {
  length  = 32
  special = false
}

#create rds cluster
resource "aws_rds_cluster" "rds" {
  cluster_identifier        = "${replace(var.env_name, ".", "-")}-rds-cluster"
  deletion_protection       = var.deletion_protection
  engine                    = "aurora-postgresql"
  engine_version            = var.engine_version
  vpc_security_group_ids    = [aws_security_group.rds.id]
  db_subnet_group_name      = aws_db_subnet_group.rds.name
  database_name             = "app"
  master_username           = "${var.env_name}.dbadmin"
  master_password           = random_password.rds_admin_pw.result
  apply_immediately         = true
  backup_retention_period   = var.backup_retention
  preferred_backup_window   = "07:00-09:00"
  final_snapshot_identifier = "${replace(var.env_name, ".", "-")}-rds-cluster-final-snapshot"

  tags = {
    Name        = "${var.env_name}-rds-cluster"
    Environment = var.env_name
  }
}

#create rds cluster instance(s)
resource "aws_rds_cluster_instance" "rds" {
  count                = var.rds_replicas
  identifier           = "${replace(var.env_name, ".", "-")}-rds-${count.index}"
  cluster_identifier   = aws_rds_cluster.rds.id
  db_subnet_group_name = aws_db_subnet_group.rds.name
  engine               = "aurora-postgresql"
  # This must match the version in associated aws_rds_cluster
  engine_version = var.engine_version
  instance_class = var.instance_class
  tags = {
    Name        = "${var.env_name}-rds-instance"
    Environment = var.env_name
  }
}
