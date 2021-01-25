#create aws vpc
resource "aws_vpc" "vpc" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    "Name"                                      = "${var.env_name}_vpc"
    "Environment"                               = var.env_name
  }
}

#create private subnets in vpc
resource "aws_subnet" "vpc_private" {
  count = var.subnet_count

  availability_zone = data.aws_availability_zones.available.names[count.index]
  cidr_block        = cidrsubnet(var.vpc_cidr, 4, count.index)
  vpc_id            = aws_vpc.vpc.id

  tags = {
    "Name"                                      = "${var.env_name}_vpc_private_${data.aws_availability_zones.available.names[count.index]}"
    "Environment"                               = var.env_name
  }
}

#create public subnets in vpc
resource "aws_subnet" "vpc_public" {
  count = var.subnet_count

  availability_zone = data.aws_availability_zones.available.names[count.index]

  cidr_block = cidrsubnet(var.vpc_cidr, 4, count.index + var.subnet_count)
  vpc_id     = aws_vpc.vpc.id

  tags = {
    "Name"                                      = "${var.env_name}_vpc_public_${data.aws_availability_zones.available.names[count.index]}"
    "Type"                                      = "Public NAT"
    "Environment"                               = var.env_name
  }
}

#create multi EIPS for multi nat gws
resource "aws_eip" "nat_multi" {
  count = var.multi_nat_gateway ? var.subnet_count : 0
  vpc   = true

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Environment = var.env_name
  }
}

#create singel EIP for nat gw
resource "aws_eip" "nat_single" {
  count = var.multi_nat_gateway ? 0 : 1
  vpc   = true

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Environment = var.env_name
  }
}

#create multi nat gws for vpc
resource "aws_nat_gateway" "vpc_multi" {
  count         = var.multi_nat_gateway ? var.subnet_count : 0
  allocation_id = aws_eip.nat_multi[count.index].id
  subnet_id     = aws_subnet.vpc_public[count.index].id

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    "Environment" = var.env_name
  }
}

#create single nat gw for vpc
resource "aws_nat_gateway" "vpc_single" {
  count         = var.multi_nat_gateway ? 0 : 1
  allocation_id = aws_eip.nat_single[0].id
  subnet_id     = aws_subnet.vpc_public[0].id

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    "Environment" = var.env_name
  }
}

#create igw for vpc
resource "aws_internet_gateway" "vpc" {
  vpc_id = aws_vpc.vpc.id

  tags = {
    Name        = "${var.env_name}_vpc"
    Environment = var.env_name
  }
}

#private route table(s) for vpc
resource "aws_route_table" "vpc_private" {
  vpc_id = aws_vpc.vpc.id
  count  = var.subnet_count

  tags = {
    "Name"        = "${var.env_name}_vpc_private_${data.aws_availability_zones.available.names[count.index]}"
    "Environment" = var.env_name
  }
}

#public route table(s) for vpc
resource "aws_route_table" "vpc_public" {
  vpc_id = aws_vpc.vpc.id
  count  = var.subnet_count

  tags = {
    "Name"        = "${var.env_name}_vpc_public_${data.aws_availability_zones.available.names[count.index]}"
    "Environment" = var.env_name
  }
}

#create default route for public access
resource "aws_route" "vpc_public_default" {
  count                  = var.subnet_count
  route_table_id         = element(aws_route_table.vpc_public.*.id, count.index)
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.vpc.id
}

#create default route for private subnets multi nat
resource "aws_route" "vpc_private_default_multi" {
  count                  = var.multi_nat_gateway ? var.subnet_count : 0
  route_table_id         = element(aws_route_table.vpc_private.*.id, count.index)
  destination_cidr_block = "0.0.0.0/0"
  nat_gateway_id         = aws_nat_gateway.vpc_multi[count.index].id
}

#create default route for private subnets single nat
resource "aws_route" "vpc_private_default_single" {
  count                  = var.multi_nat_gateway ? 0 : var.subnet_count
  route_table_id         = element(aws_route_table.vpc_private.*.id, count.index)
  destination_cidr_block = "0.0.0.0/0"
  nat_gateway_id         = aws_nat_gateway.vpc_single[0].id
}

#create route table associations for public subnets
resource "aws_route_table_association" "vpc_public" {
  count          = var.subnet_count
  subnet_id      = aws_subnet.vpc_public[count.index].id
  route_table_id = element(aws_route_table.vpc_public.*.id, count.index)
}

#create route table associations for private subnets
resource "aws_route_table_association" "vpc_private" {
  count          = var.subnet_count
  subnet_id      = aws_subnet.vpc_private[count.index].id
  route_table_id = element(aws_route_table.vpc_private.*.id, count.index)
}
