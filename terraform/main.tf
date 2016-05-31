resource "aws_db_instance" "forms" {
	allocated_storage = 10 # allocated storage in GB
	engine = "mysql"
	engine_version = "5.6.17" # check most recent
	instance_class = "db.t1.micro" # check what we want for these
	identifier = "${var.environment}-forms"
	name = "" # table name to create
	username = "${var.rds_username}"
	password = "${var.rds_password}"
	db_subnet_group_name = "" # research
	parameter_group_name = "default.mysql5.6" # research
}