#setup route53 for the vpc
resource "aws_route53_zone" "vpc" {
  name = var.env_name

  tags = {
    Environment = var.env_name
  }
}
