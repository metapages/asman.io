#kms key
resource "aws_kms_key" "key" {
  description             = "${var.env_name} key"
  deletion_window_in_days = 7
}

#kms key alias 
resource "aws_kms_alias" "key" {
  name          = "alias/${replace(var.env_name, ".", "_")}"
  target_key_id = aws_kms_key.key.key_id
}

# create an ECR to store docker images for aws regions
resource "aws_ecr_repository" "ecr-us-east-1" {
  for_each = toset(var.repos)
  name     = "${var.env_name}/${each.value}"
}

