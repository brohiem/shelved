#!/bin/bash
# ============================================================
# STEP 3: Cloud SQL (MySQL) Instance & Database
# Creates the managed MySQL database for the bookstore
# ============================================================

set -e

INSTANCE_NAME="bookstore-db"
DB_NAME="bookstore"
DB_USER="bookstore_app"
DB_PASS="ChangeMe_Str0ng!Pass"   # ← CHANGE THIS!
REGION="us-central1"
NETWORK_NAME="bookstore-vpc"

echo "═══════════════════════════════════════════"
echo "  Step 3: Cloud SQL (MySQL) Setup"
echo "═══════════════════════════════════════════"

# ─── Create Cloud SQL instance ───
# This is the BIG one — takes 5-10 minutes
echo "→ Creating Cloud SQL instance: $INSTANCE_NAME"
echo "  (this takes 5-10 minutes, grab some coffee...)"
gcloud sql instances create $INSTANCE_NAME \
  --database-version=MYSQL_8_0 \
  --tier=db-n1-standard-1 \
  --region=$REGION \
  --network=$NETWORK_NAME \
  --no-assign-ip \
  --storage-size=10GB \
  --storage-type=SSD \
  --storage-auto-increase \
  --backup-start-time=03:00 \
  --availability-type=zonal \
  --root-password="$DB_PASS"

# ─── Create the database ───
echo "→ Creating database: $DB_NAME"
gcloud sql databases create $DB_NAME \
  --instance=$INSTANCE_NAME \
  --charset=utf8mb4 \
  --collation=utf8mb4_unicode_ci

# ─── Create application user ───
echo "→ Creating database user: $DB_USER"
gcloud sql users create $DB_USER \
  --instance=$INSTANCE_NAME \
  --password="$DB_PASS"

# ─── Get the private IP ───
echo ""
echo "→ Fetching private IP address..."
PRIVATE_IP=$(gcloud sql instances describe $INSTANCE_NAME \
  --format="value(ipAddresses.filter(type=PRIVATE).ipAddress)")

echo ""
echo "═══════════════════════════════════════════"
echo "  ✓ Cloud SQL instance created!"
echo "═══════════════════════════════════════════"
echo ""
echo "  Instance:    $INSTANCE_NAME"
echo "  Database:    $DB_NAME"
echo "  User:        $DB_USER"
echo "  Private IP:  $PRIVATE_IP"
echo "  Version:     MySQL 8.0"
echo ""
echo "  SAVE THIS → Private IP: $PRIVATE_IP"
echo "  You'll need it for the app's .env file"
echo ""
echo "Next: Run 04-create-compute.sh"
