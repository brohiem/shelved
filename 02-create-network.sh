#!/bin/bash
# ============================================================
# STEP 2: VPC Network & Firewall Rules
# Creates the network infrastructure for the bookstore
# ============================================================

set -e

NETWORK_NAME="bookstore-vpc"
REGION="us-central1"

echo "═══════════════════════════════════════════"
echo "  Step 2: Network & Firewall Setup"
echo "═══════════════════════════════════════════"

# ─── Create custom VPC ───
echo "→ Creating VPC network: $NETWORK_NAME"
gcloud compute networks create $NETWORK_NAME \
  --subnet-mode=auto \
  --description="VPC for bookstore demo app"

# ─── Firewall: Allow HTTP/HTTPS from internet ───
echo "→ Creating firewall rule: allow-http"
gcloud compute firewall-rules create bookstore-allow-http \
  --network=$NETWORK_NAME \
  --allow=tcp:80,tcp:443 \
  --source-ranges=0.0.0.0/0 \
  --target-tags=http-server \
  --description="Allow HTTP/HTTPS traffic to web servers"

# ─── Firewall: Allow SSH ───
echo "→ Creating firewall rule: allow-ssh"
gcloud compute firewall-rules create bookstore-allow-ssh \
  --network=$NETWORK_NAME \
  --allow=tcp:22 \
  --source-ranges=0.0.0.0/0 \
  --target-tags=ssh-server \
  --description="Allow SSH access"

# ─── Firewall: Allow internal traffic (GCE ↔ Cloud SQL) ───
echo "→ Creating firewall rule: allow-internal"
gcloud compute firewall-rules create bookstore-allow-internal \
  --network=$NETWORK_NAME \
  --allow=tcp:3306,tcp:8080,icmp \
  --source-ranges=10.128.0.0/9 \
  --description="Allow internal traffic between GCE and Cloud SQL"

# ─── Allocate private IP range for Cloud SQL ───
echo "→ Allocating private IP range for Cloud SQL"
gcloud compute addresses create bookstore-sql-range \
  --global \
  --purpose=VPC_PEERING \
  --addresses=10.100.0.0 \
  --prefix-length=24 \
  --network=$NETWORK_NAME

# ─── Create private connection for Cloud SQL ───
echo "→ Creating private services connection (this takes 1-2 min)..."
gcloud services vpc-peerings connect \
  --service=servicenetworking.googleapis.com \
  --ranges=bookstore-sql-range \
  --network=$NETWORK_NAME

echo ""
echo "✓ VPC '$NETWORK_NAME' created"
echo "✓ Firewall rules: HTTP, SSH, Internal"
echo "✓ Private IP range allocated for Cloud SQL"
echo ""
echo "Next: Run 03-create-database.sh"
