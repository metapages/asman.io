#default vpc security group
resource "aws_security_group" "vpc" {
  name        = "${var.env_name}_default_vpc_sg"
  description = "default sg for vpc"
  vpc_id      = aws_vpc.vpc.id

  tags = merge(
    var.tags,
    {
      "Name"                                                  = "${var.env_name}_default_vpc_sg"
    },
    {
      "Environment"         = var.env_name
    },
  )
}

#default vpc security group egress to internet
resource "aws_security_group_rule" "default_vpc_egress_internet" {
  description       = "Allow nodes all egress to the Internet."
  protocol          = "-1"
  security_group_id = aws_security_group.vpc.id
  cidr_blocks       = ["0.0.0.0/0"]
  from_port         = 0
  to_port           = 0
  type              = "egress"
}

