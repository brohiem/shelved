#!/bin/bash
# ============================================================
# STEP 1: GCP Project Setup
# Run this first to configure your GCP project and enable APIs
# ============================================================

set -e

# ─── CONFIGURE THESE ───
PROJECT_ID="bookstore-demo-$(date +%s)"  # unique project ID
REGION="us-central1"
ZONE="us-central1-a"

echo "═══════════════════════════════════════════"
echo "  Step 1: GCP Project & API Setup"
echo "═══════════════════════════════════════════"

# Create a new project (or skip if using existing)
echo "→ Creating project: $PROJECT_ID"
gcloud projects create $PROJECT_ID --name="Bookstore Demo" 2>/dev/null || echo "  (project may already exist, continuing...)"

# Set as active project
echo "→ Setting active project"
gcloud config set project $PROJECT_ID

# Set default region/zone
echo "→ Setting default region ($REGION) and zone ($ZONE)"
gcloud config set compute/region $REGION
gcloud config set compute/zone $ZONE

# Enable required APIs
echo "→ Enabling APIs (this may take a minute)..."
gcloud services enable compute.googleapis.com
gcloud services enable sqladmin.googleapis.com
gcloud services enable servicenetworking.googleapis.com

echo ""
echo "✓ Project $PROJECT_ID is ready"
echo "✓ APIs enabled: Compute Engine, Cloud SQL Admin, Service Networking"
echo ""
echo "IMPORTANT: Make sure billing is enabled for this project."
echo "  → https://console.cloud.google.com/billing/linkedaccount?project=$PROJECT_ID"
echo ""
echo "Next: Run 02-create-network.sh"
