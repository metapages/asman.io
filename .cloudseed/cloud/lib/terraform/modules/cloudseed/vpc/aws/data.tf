#used to obtain region info in aws
data "aws_region" "current" {
}

#used to get info on aws account
data "aws_caller_identity" "current" {
}

#used to obtain info on availability zones
data "aws_availability_zones" "available" {
}

