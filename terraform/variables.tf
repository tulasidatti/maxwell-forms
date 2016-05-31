################################################
# Generic stuff
################################################
# You should override the default to be your name in terraform.tfvars
# e.g. environment = "ada"
variable "environment" {
	default = "local"
}
variable "region" {
	description = "The region of AWS, for AMI lookups."
  default = "us-east-1"
}

################################################
# Credentials
################################################
variable "access_key" {
	description = "Access key to provider (AWS, openstack, etc)"
}
variable "secret_key" {
	description = "Secret key to provider (AWS, openstack, etc)"
}
variable "rds_username" {
}
variable "rds_password" {
}