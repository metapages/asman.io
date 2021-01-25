output "vpc_cidr" {
  value       = var.vpc_cidr
  description = "output the vpc subnet block"
}

output "vpc_id" {
  value       = aws_vpc.vpc.id
  description = "output the vpc id"
}

output "region" {
  value       = data.aws_region.current.id
  description = "output the current aws region"
}

output "hosted_zone_id" {
  value       = aws_route53_zone.vpc.id
  description = "output the route53 zone id"
}

output "tld" {
  value       = aws_route53_zone.vpc.name
  description = "output the internal domain name of the vpc"
}

output "route_table_id" {
  value       = aws_route_table.vpc_private.*.id
  description = "output the route table ids for private subnets"
}

output "azs" {
  value       = aws_subnet.vpc_private.*.availability_zone
  description = "output the private subnet availability_zones"
}

output "vpc_sg_id" {
  value       = aws_security_group.vpc.*.id
  description = "output the eks worker groups security group ids"
}

output "vpc_private_subnets" {
  value       = aws_subnet.vpc_private.*.id
  description = "output the private subnet ids in vpc"
}

