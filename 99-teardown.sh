#!/bin/bash
# ============================================================
# TEARDOWN: Delete all resources to stop billing
# Run this when you're done with the demo!
# ============================================================

set -e

echo "═══════════════════════════════════════════"
echo "  ⚠️  TEARDOWN: Delete all bookstore resources"
echo "═══════════════════════════════════════════"
echo ""
read -p "Are you sure? This deletes EVERYTHING. (yes/no): " CONFIRM
if [ "$CONFIRM" != "yes" ]; then
  echo "Cancelled."
  exit 0
fi

echo ""
echo "→ Deleting Compute Engine instance..."
gcloud compute instances delete bookstore-server \
  --zone=us-central1-a --quiet

echo "→ Deleting Cloud SQL instance (takes a few minutes)..."
gcloud sql instances delete bookstore-db --quiet

echo "→ Deleting firewall rules..."
gcloud compute firewall-rules delete bookstore-allow-http --quiet
gcloud compute firewall-rules delete bookstore-allow-ssh --quiet
gcloud compute firewall-rules delete bookstore-allow-internal --quiet

echo "→ Deleting private IP allocation..."
gcloud compute addresses delete bookstore-sql-range --global --quiet

echo "→ Deleting VPC network..."
gcloud compute networks delete bookstore-vpc --quiet

echo ""
echo "═══════════════════════════════════════════"
echo "  ✓ All resources deleted. Billing will stop."
echo "═══════════════════════════════════════════"
