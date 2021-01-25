output "aws-kms-key" {
  value = aws_kms_key.key.arn 
}


#data template for sops.yaml file
data "template_file" "sops_yaml" {
  template = file("${path.module}/templates/sops.yaml.tpl")

  vars = {
    env_name            = var.env_name
    kms_key_arn         = aws_kms_key.key.arn
  }
}

#creates local kubeconfig file
resource "local_file" "sops_yaml" {
  content              = data.template_file.sops_yaml.rendered
  filename             = "../../../../../.sops.yaml"
  directory_permission = "0755"
  file_permission      = "0755"
}
