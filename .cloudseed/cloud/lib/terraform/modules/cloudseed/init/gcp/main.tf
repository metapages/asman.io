resource "google_kms_key_ring" "dev" {
  project  = var.project
  name     = var.kms_key_ring_name
  location = var.location
}

resource "google_kms_crypto_key" "dev" {
  name     = var.kms_crypto_key_name
  key_ring = google_kms_key_ring.dev.self_link
}

resource "google_project_service" "dev" {
  project  = var.project
  service = var.containerregistry_svc_name
  disable_dependent_services = true
}

# create an ECR to store docker images for aws regions
resource "google_container_registry" "dev" {
  project  = var.project
  location = var.location
  depends_on = [google_project_service.dev]
}
