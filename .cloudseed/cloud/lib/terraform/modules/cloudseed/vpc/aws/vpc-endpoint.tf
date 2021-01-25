#create ecr-dkr vpc endpoint for performance and cost
resource "aws_vpc_endpoint" "ecr-dkr" {
  vpc_id             = aws_vpc.vpc.id
  service_name       = "com.amazonaws.${data.aws_region.current.name}.ecr.dkr"
  vpc_endpoint_type  = "Interface"
  security_group_ids = [aws_security_group.vpc.id]
}

#create ecr-api vpc endpoint for performance and cost
resource "aws_vpc_endpoint" "ecr-api" {
  vpc_id             = aws_vpc.vpc.id
  service_name       = "com.amazonaws.${data.aws_region.current.name}.ecr.api"
  vpc_endpoint_type  = "Interface"
  security_group_ids = [aws_security_group.vpc.id]
  subnet_ids         = concat(aws_subnet.vpc_private.*.id)
}

#create s3 vpc endpoint for performance and cost
resource "aws_vpc_endpoint" "s3" {
  vpc_id          = aws_vpc.vpc.id
  service_name    = "com.amazonaws.${data.aws_region.current.name}.s3"
  route_table_ids = concat(aws_route_table.vpc_private.*.id, aws_route_table.vpc_public.*.id)
}
